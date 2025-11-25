import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description?: string;
  excerpt?: string;
  lang?: string;
  author?: string;
  contentHtml?: string;
}

/**
 * Generate excerpt from markdown content if not already provided
 * @param excerptFromFrontmatter - Excerpt from frontmatter (may be empty)
 * @param content - The markdown content to generate excerpt from
 * @returns Generated excerpt or the provided one
 */
function generateExcerpt(excerptFromFrontmatter: string | undefined, content: string): string {
  // Use provided excerpt if it exists and is not empty
  if (excerptFromFrontmatter && excerptFromFrontmatter.trim() !== '') {
    return excerptFromFrontmatter;
  }

  // Remove markdown formatting and get first paragraph or 160 characters
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\([^\)]*\)/g, '$1') // Remove links but keep text
    .replace(/[#*_~]/g, '') // Remove markdown formatting
    .trim();
  
  // Get first paragraph or first 160 characters
  const firstParagraph = cleanContent.split('\n\n')[0];
  return firstParagraph.length > 160 
    ? firstParagraph.substring(0, 160).trim() + '...' 
    : firstParagraph;
}

export function getSortedPostsData(): PostData[] {
  // Get all directories in content/blog
  const postDirs = fs.readdirSync(postsDirectory);
  const allPostsData = postDirs
    .map((dir) => {
      const fullPath = path.join(postsDirectory, dir);
      
      // Check if it's a directory
      if (!fs.statSync(fullPath).isDirectory()) {
        return null;
      }

      // Read markdown file with slug
      const indexPath = path.join(fullPath, 'index.md');
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(indexPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Generate excerpt from content if not provided
      const excerpt = generateExcerpt(matterResult.data.excerpt, matterResult.content);

      // Combine the data with the slug
      return {
        slug: dir,
        title: matterResult.data.title || dir,
        date: matterResult.data.date || new Date().toISOString(),
        description: matterResult.data.description || excerpt,
        excerpt: excerpt,
        lang: matterResult.data.lang || 'fr',
        author: matterResult.data.author,
      } as PostData;
    })
    .filter((post): post is PostData => post !== null);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getAllPostSlugs() {
  const postDirs = fs.readdirSync(postsDirectory);
  return postDirs
    .filter((dir) => {
      const fullPath = path.join(postsDirectory, dir);
      if (!fs.statSync(fullPath).isDirectory()) {
        return false;
      }
      const indexPath = path.join(fullPath, 'index.md');
      return fs.existsSync(indexPath);
    })
    .map((dir) => ({
      params: {
        slug: dir,
      },
    }));
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, slug, 'index.md');
  
  // Check if file exists before reading
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Generate excerpt from content if not provided
  const excerpt = generateExcerpt(matterResult.data.excerpt, matterResult.content);

  // Use remark to convert markdown into HTML string
  // Note: sanitize is false because all content is trusted (author-controlled markdown files)
  // not user-generated content
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug
  return {
    slug,
    contentHtml,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || new Date().toISOString(),
    description: matterResult.data.description || excerpt,
    excerpt: excerpt,
    lang: matterResult.data.lang || 'fr',
    author: matterResult.data.author,
  };
}

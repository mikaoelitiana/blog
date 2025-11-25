import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const assetsDirectory = path.join(process.cwd(), 'content/assets');
const publicDirectory = path.join(process.cwd(), 'public');

/**
 * Copy all images from blog post directories to the public directory
 * This ensures they are available in the static export
 */
export function copyBlogImages(): void {
  // Ensure public directory exists
  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory, { recursive: true });
  }

  // Copy assets directory
  if (fs.existsSync(assetsDirectory)) {
    const targetAssetsDir = path.join(publicDirectory, 'content', 'assets');
    if (!fs.existsSync(targetAssetsDir)) {
      fs.mkdirSync(targetAssetsDir, { recursive: true });
    }

    const assetFiles = fs.readdirSync(assetsDirectory);
    assetFiles.forEach((file) => {
      const sourcePath = path.join(assetsDirectory, file);
      const targetPath = path.join(targetAssetsDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied asset: ${file}`);
      }
    });
  }

  // Get all blog post directories
  const postDirs = fs.readdirSync(postsDirectory);

  postDirs.forEach((dir) => {
    const fullPath = path.join(postsDirectory, dir);

    // Check if it's a directory
    if (!fs.statSync(fullPath).isDirectory()) {
      return;
    }

    // Read all files in the blog post directory
    const files = fs.readdirSync(fullPath);

    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter((file) =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    if (imageFiles.length > 0) {
      // Create blog post directory in public
      const targetDir = path.join(publicDirectory, 'blog', dir);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Copy each image file
      imageFiles.forEach((imageFile) => {
        const sourcePath = path.join(fullPath, imageFile);
        const targetPath = path.join(targetDir, imageFile);

        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${dir}/${imageFile}`);
      });
    }
  });
}

// Run the script with error handling
try {
  console.log('Copying blog images to public directory...');
  copyBlogImages();
  console.log('Done!');
} catch (error) {
  console.error('Error copying blog images:', error);
  process.exit(1);
}

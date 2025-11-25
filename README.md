# Next.js Blog

A personal blog built with Next.js 15, TypeScript, and Markdown.

## 🚀 Quick start

1.  **Install dependencies**

    ```sh
    npm install
    ```

2.  **Start developing**

    Navigate into your site's directory and start it up.

    ```sh
    npm run dev
    ```

3.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:3000`!

## 📝 Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Static Site Generation (SSG)
- ✅ Markdown blog posts
- ✅ Syntax highlighting with Prism
- ✅ SEO optimized with metadata
- ✅ Responsive design

## 🧐 What's inside?

A quick look at the top-level files and directories in this Next.js project.

    .
    ├── app/                 # Next.js App Router pages
    ├── components/          # React components
    ├── content/            # Blog posts and assets
    ├── lib/                # Utility functions
    ├── out/                # Static export output (after build)
    ├── public/             # Static files
    ├── .eslintrc.json      # ESLint configuration
    ├── .gitignore          # Git ignore rules
    ├── next.config.ts      # Next.js configuration
    ├── package.json        # Dependencies and scripts
    ├── tsconfig.json       # TypeScript configuration
    └── README.md           # This file

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 🔧 Building and Deploying

This project is configured for static site generation. To build:

```sh
npm run build
```

The static files will be in the `out` directory, ready to deploy to any static hosting service.

## 🎨 Customization

### Site Metadata

Edit `lib/config.ts` to update site metadata:

```typescript
export const siteMetadata = {
  title: 'Your Name',
  author: '@yourusername',
  description: 'Your site description',
  siteUrl: 'https://yoursite.com',
  social: {
    twitter: 'yourusername',
    github: 'yourusername',
  },
};
```

### Styling

Global styles are in `app/globals.css`. The design is inspired by the Typography.js WordPress 2016 theme.

## 📝 Adding Blog Posts

Blog posts are stored in `content/blog/`. Each post is in its own directory with an `index.md` file:

```
content/blog/
├── my-first-post/
│   ├── index.md
│   └── image.png
└── another-post/
    └── index.md
```

### Frontmatter

Each post should include frontmatter:

```markdown
---
title: "My Blog Post"
date: 2024-01-01
description: "A brief description"
lang: fr
author: yourusername
---

Your content here...
```

## 🚢 Migration from Gatsby

This project was migrated from Gatsby to Next.js for better tooling and ecosystem support. The migration includes:

- ✅ App Router with TypeScript
- ✅ Static Site Generation
- ✅ Markdown processing with remark
- ✅ Image optimization with next/image
- ✅ SEO metadata
- ✅ All existing blog posts preserved

## 📄 License

MIT

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

// Remark Plugins
import RemarkSlug from "remark-slug";

// Setting root path
const root = process.cwd();

// Function to get a specific page by slug
export async function getFileBySlug(slug: string, overridePath?: string, type?: string) {
  const source = type 
    ? fs.readFileSync(path.join(root, 'content', type, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, 'content', `${slug}.mdx`), "utf8");

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        RemarkSlug,
      ],
      rehypePlugins: [],
    },
  });

  return {
    mdxSource,
    frontmatter: {
      slug: overridePath || slug,
      ...data,
    },
  };
}

// Function to get all files by type
export async function getAllFilesByType(type: string) {
  const files = fs.readdirSync(path.join(root, "content", type));
  
  return files.reduce((posts, slug) => {
    const file = fs.readFileSync(
      path.join(root, "content", type, slug),
      "utf-8"
    );

    const { data } = matter(file);
    return [
      {
        ...data,
        slug: slug.replace(/\.mdx/, ""),
      },
      ...posts,
    ];
  }, [])
}

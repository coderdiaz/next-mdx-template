import { getAllFilesByType, getFileBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote";

const PostPage = ({ mdxSource, frontmatter }) => {
  return <>
    <MDXRemote {...mdxSource} />
  </>;
}

export async function getStaticPaths() {
  const posts = await getAllFilesByType("posts");

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug.replace(/\.mdx/, "")
      }
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug(params.slug, null, "posts");

  return {
    props: post,
  };
}

export default PostPage;

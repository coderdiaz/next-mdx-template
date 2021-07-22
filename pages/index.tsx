import { getFileBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote";

const IndexPage = ({ mdxSource, frontmatter }) => {
  return <>
    <MDXRemote {...mdxSource} />
  </>;
}

export async function getStaticProps() {
  const page = await getFileBySlug("index", "/");

  return {
    props: page,
  };
}

export default IndexPage;

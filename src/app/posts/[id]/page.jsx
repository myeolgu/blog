import { notFound } from "next/navigation";
import PostDetail from "../../../components/PostDetail";
import { posts } from "../../../posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = posts.find((item) => item.id === id);

  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) notFound();

  return (
    <section className="content-layout">
      <PostDetail
        nextPost={index > 0 ? posts[index - 1] : null}
        post={posts[index]}
        previousPost={index < posts.length - 1 ? posts[index + 1] : null}
      />
    </section>
  );
}

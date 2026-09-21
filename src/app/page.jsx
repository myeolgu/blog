import { Suspense } from "react";
import PostList from "../components/PostList";
import { posts } from "../posts";

const postSummaries = posts.map(({ id, title, excerpt, date, category, categories, tags }) => ({
  id,
  title,
  excerpt,
  date,
  categories: categories ?? [category],
  tags,
}));

export default function HomePage() {
  return (
    <Suspense>
      <PostList posts={postSummaries} />
    </Suspense>
  );
}

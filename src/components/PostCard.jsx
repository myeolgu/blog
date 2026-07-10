export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-card__meta">
        <span>{post.category}</span>
        <span>{post.readTime}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <time dateTime={post.date}>{post.date}</time>
    </article>
  );
}

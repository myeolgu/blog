import { Calendar, Clock, Tag } from "lucide-react";

export default function PostCard({ post, featured = false }) {
  return (
    <article className={featured ? "post-card post-card--featured" : "post-card"}>
      <div className="post-card__topline">
        <span className="category-pill">{post.category}</span>
        <span>{post.series}</span>
      </div>

      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>

      <ul className="tag-list" aria-label={`${post.title} tags`}>
        {post.tags.map((tag) => (
          <li key={tag}>
            <Tag size={13} aria-hidden="true" />
            {tag}
          </li>
        ))}
      </ul>

      <div className="post-card__meta">
        <span>
          <Calendar size={15} aria-hidden="true" />
          <time dateTime={post.date}>{post.date}</time>
        </span>
        <span>
          <Clock size={15} aria-hidden="true" />
          {post.readTime}
        </span>
      </div>
    </article>
  );
}

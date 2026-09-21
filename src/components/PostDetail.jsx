import Link from "next/link";

export default function PostDetail({ nextPost, post, previousPost }) {
  const PostContent = post.Content;

  return (
    <article className="post-article">
      <header className="post-article-header">
        <h2>{post.title}</h2>
        <div className="post-article-meta">
          <span>{post.author}</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <ul className="tag-list" aria-label={`${post.title} tags`}>
          {post.tags.map((tag) => (
            <li className="content-label content-label-tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="post-content">
        <PostContent />
      </div>

      <nav
        className="post-navigation"
        aria-label="Post navigation"
        data-next={nextPost ? "true" : "false"}
        data-previous={previousPost ? "true" : "false"}
      >
        {previousPost ? (
          <Link className="post-navigation-link" href={`/posts/${previousPost.id}`}>
            <span className="post-navigation-label">이전 글</span>
            <strong>{previousPost.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        <Link className="post-navigation-list" href="/">
          목록으로
        </Link>
        {nextPost ? (
          <Link className="post-navigation-link post-navigation-next" href={`/posts/${nextPost.id}`}>
            <span className="post-navigation-label">다음 글</span>
            <strong>{nextPost.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

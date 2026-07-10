import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { posts } from "./posts";

const categories = ["All", "HTML", "CSS", "JavaScript", "React", "Browser", "Archive"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [activeTab, setActiveTab] = useState("blog");

  const filteredPosts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const searchableText = [post.title, post.excerpt, post.category, ...post.tags]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalizedTerm || searchableText.includes(normalizedTerm);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const selectedPost = posts.find((post) => post.id === selectedPostId);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setSelectedPostId(null);
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSelectedPostId(null);
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <h1 className="brand-heading">
          <button className="brand" type="button" onClick={() => handleTabChange("blog")}>
            주엽의 기억날 때 메모하는 블로그
          </button>
        </h1>
        <nav className="site-nav" aria-label="Primary navigation">
          <button
            aria-current={activeTab === "blog" ? "page" : undefined}
            className={activeTab === "blog" ? "is-active" : ""}
            type="button"
            onClick={() => handleTabChange("blog")}
          >
            Blog
          </button>
          <button
            aria-current={activeTab === "career" ? "page" : undefined}
            className={activeTab === "career" ? "is-active" : ""}
            type="button"
            onClick={() => handleTabChange("career")}
          >
            Career
          </button>
        </nav>
      </header>

      {activeTab === "blog" && !selectedPost && (
        <section className="toolbar" aria-label="Post filters">
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search posts</span>
            <input
              type="search"
              placeholder="Search posts"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <div className="category-tabs" aria-label="Categories">
            {categories.map((category) => (
              <button
                key={category}
                className={category === activeCategory ? "is-active" : ""}
                type="button"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="content-layout" id="posts">
        {activeTab === "career" ? (
          <CareerPage />
        ) : selectedPost ? (
          <PostDetail post={selectedPost} onBack={() => setSelectedPostId(null)} />
        ) : (
          <PostGrid posts={filteredPosts} onSelectPost={setSelectedPostId} />
        )}
      </section>
    </main>
  );
}

function CareerPage() {
  return (
    <section className="career-page" aria-labelledby="career-title">
      <p className="eyebrow">Career</p>
      <h2 id="career-title">주엽의 커리어</h2>
      <p>경력, 프로젝트, 기술 스택을 정리하는 공간입니다.</p>
    </section>
  );
}

function PostGrid({ posts, onSelectPost }) {
  if (posts.length === 0) {
    return (
      <section className="empty-state" aria-labelledby="empty-title">
        <p className="eyebrow">Posts</p>
        <h2 id="empty-title">조건에 맞는 글이 없습니다.</h2>
        <p>검색어를 바꾸거나 다른 카테고리를 선택해보세요.</p>
      </section>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <article
          aria-label={`${post.title} 글 읽기`}
          className="post-card"
          key={post.id}
          role="button"
          tabIndex={0}
          onClick={() => onSelectPost(post.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelectPost(post.id);
            }
          }}
        >
          <div className="post-card-topline">
            <span className="content-label content-label-category">{post.category}</span>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <ul className="tag-list" aria-label={`${post.title} tags`}>
            {post.tags.map((tag) => (
              <li className="content-label content-label-tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function PostDetail({ post, onBack }) {
  const PostContent = post.Content;

  return (
    <article className="post-article">
      <button className="back-button" type="button" onClick={onBack}>
        목록으로
      </button>
      <header className="post-article-header">
        <p className="eyebrow">{post.category}</p>
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
    </article>
  );
}

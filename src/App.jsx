import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Search } from "lucide-react";
import { posts } from "./posts";

const categories = ["All", "HTML", "CSS", "JavaScript", "React", "Browser", "AI"];
const postsPerPage = 9;

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [activeTab, setActiveTab] = useState("blog");
  const [showTopButton, setShowTopButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 240);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const pageStart = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(pageStart, pageStart + postsPerPage);

  const selectedPost = posts.find((post) => post.id === selectedPostId);
  const selectedPostIndex = posts.findIndex((post) => post.id === selectedPostId);
  const previousPost = selectedPostIndex < posts.length - 1 ? posts[selectedPostIndex + 1] : null;
  const nextPost = selectedPostIndex > 0 ? posts[selectedPostIndex - 1] : null;

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setCurrentPage(1);
    setSelectedPostId(null);
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSelectedPostId(null);
  }

  function handlePostNavigation(postId) {
    setSelectedPostId(postId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePostList() {
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={selectedPost ? "app-shell post-view" : "app-shell"}>
      <header className="site-header">
        <h1 className="brand-heading">
          <button className="brand" type="button" onClick={() => handleTabChange("blog")}>
            주엽 기록실.log
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
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
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
          <PostDetail
            nextPost={nextPost}
            post={selectedPost}
            previousPost={previousPost}
            onBack={handlePostList}
            onNavigate={handlePostNavigation}
          />
        ) : (
          <>
            <PostGrid posts={paginatedPosts} onSelectPost={setSelectedPostId} />
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
            )}
          </>
        )}
      </section>

      {showTopButton && (
        <button
          aria-label="Back to top"
          className="top-button"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={18} aria-hidden="true" />
          <span>Top</span>
        </button>
      )}
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

function Pagination({ currentPage, totalPages, onChange }) {
  return (
    <nav className="pagination" aria-label="Post pages">
      <button disabled={currentPage === 1} type="button" onClick={() => onChange(currentPage - 1)}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            aria-current={page === currentPage ? "page" : undefined}
            className={page === currentPage ? "pagination-current" : ""}
            key={page}
            type="button"
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button disabled={currentPage === totalPages} type="button" onClick={() => onChange(currentPage + 1)}>
        Next
      </button>
    </nav>
  );
}

function PostDetail({ nextPost, post, previousPost, onBack, onNavigate }) {
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

      <nav className="post-navigation" aria-label="Post navigation">
        {previousPost ? (
          <button className="post-navigation-link" type="button" onClick={() => onNavigate(previousPost.id)}>
            <span className="post-navigation-label">이전 글</span>
            <strong>{previousPost.title}</strong>
          </button>
        ) : (
          <span />
        )}
        <button className="post-navigation-list" type="button" onClick={onBack}>
          목록으로
        </button>
        {nextPost ? (
          <button
            className="post-navigation-link post-navigation-next"
            type="button"
            onClick={() => onNavigate(nextPost.id)}
          >
            <span className="post-navigation-label">다음 글</span>
            <strong>{nextPost.title}</strong>
          </button>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

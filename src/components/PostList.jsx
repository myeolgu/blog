"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const categories = ["All", "HTML", "CSS", "JavaScript", "React", "Browser", "AI"];
const postsPerPage = 9;

export default function PostList({ posts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";
  const searchTerm = searchParams.get("q") ?? "";
  const [searchInput, setSearchInput] = useState(searchTerm);

  const filteredPosts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.categories.includes(activeCategory);
      const searchableText = [post.title, post.excerpt, ...post.categories, ...post.tags]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalizedTerm || searchableText.includes(normalizedTerm);

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const currentPage = Math.min(Number(searchParams.get("page")) || 1, totalPages);
  const pageStart = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(pageStart, pageStart + postsPerPage);

  function updateQuery(changes, { replace = false } = {}) {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    const query = params.toString();
    const url = query ? `/?${query}` : "/";

    if (replace) router.replace(url, { scroll: false });
    else router.push(url, { scroll: false });
  }

  function handleCategoryChange(category) {
    updateQuery({ category: category === "All" ? "" : category, page: "" });
  }

  function handleSearchChange(value) {
    setSearchInput(value);
    updateQuery({ q: value, page: "" }, { replace: true });
  }

  function handlePageChange(page) {
    updateQuery({ page: page > 1 ? String(page) : "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="toolbar" aria-label="Post filters">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search posts</span>
          <input
            type="search"
            placeholder="Search posts"
            value={searchInput}
            onChange={(event) => handleSearchChange(event.target.value)}
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

      <section className="content-layout" id="posts">
        <PostGrid posts={paginatedPosts} />
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
        )}
      </section>
    </>
  );
}

function PostGrid({ posts }) {
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
        <article className="post-card" key={post.id}>
          <div className="post-card-topline">
            <div className="category-list">
              {post.categories.map((category) => (
                <span className="content-label content-label-category" key={category}>
                  {category}
                </span>
              ))}
            </div>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h2>
            <Link className="post-card-link" href={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>
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

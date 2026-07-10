import { Search } from "lucide-react";
import PostCard from "./components/PostCard.jsx";
import { posts } from "./data/posts.js";

export default function App() {
  const featuredPost = posts[0];
  const latestPosts = posts.slice(1);

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="React Blog home">
          React Blog
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#latest">Latest</a>
          <a href="#archive">Archive</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="intro" aria-labelledby="intro-title">
        <div>
          <p className="eyebrow">Codex-ready React blog</p>
          <h1 id="intro-title">글을 먼저 보여주는 React 블로그</h1>
          <p className="intro-copy">
            Skill 지침과 React 앱 골격을 함께 잡아두어 다음 구현을 빠르게 이어갈 수 있습니다.
          </p>
        </div>
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search posts</span>
          <input type="search" placeholder="Search posts" />
        </label>
      </section>

      <section className="featured" aria-labelledby="featured-title">
        <div className="section-heading">
          <p className="eyebrow">Featured</p>
          <h2 id="featured-title">오늘의 기준점</h2>
        </div>
        <PostCard post={featuredPost} />
      </section>

      <section id="latest" className="latest" aria-labelledby="latest-title">
        <div className="section-heading">
          <p className="eyebrow">Latest</p>
          <h2 id="latest-title">최근 글</h2>
        </div>
        <div className="post-grid">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}

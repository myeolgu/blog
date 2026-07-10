import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Search } from "lucide-react";
import { posts } from "./posts";

const categories = ["All", "HTML", "CSS", "JavaScript", "React", "Browser", "AI"];
const postsPerPage = 9;
const aiGuidelines = [
  {
    title: "규칙 1 - 코딩 전에 생각하세요",
    items: [
      "가정을 명시적으로 말하세요.",
      "불확실하면 추측하지 말고 물어보세요.",
      "모호함이 있으면 여러 해석을 제시하세요.",
      "더 단순한 접근이 있다면 이의를 제기하세요.",
      "혼란스러우면 멈추세요. 무엇이 불명확한지 말하세요.",
    ],
  },
  {
    title: "규칙 2 - 단순함이 먼저",
    items: [
      "문제를 해결하는 최소한의 코드만 작성하세요.",
      "투기적인 것은 작성하지 마세요.",
      "요청받은 것 이상의 기능은 추가하지 마세요.",
      "일회성 코드를 위한 추상화는 만들지 마세요.",
      "테스트: 시니어 엔지니어가 복잡하다고 할까? 그렇다면 단순화하세요.",
    ],
  },
  {
    title: "규칙 3 - 외과적 변경",
    items: [
      "반드시 필요한 것만 건드리세요.",
      "자신의 실수만 정리하세요.",
      "인접한 코드, 주석, 서식을 ‘개선’하지 마세요.",
      "망가지지 않은 것은 리팩토링하지 마세요.",
      "기존 스타일을 따르세요.",
    ],
  },
  {
    title: "규칙 4 - 목표 중심 실행",
    items: [
      "성공 기준을 정의하세요.",
      "확인될 때까지 반복하세요.",
      "단계를 따르지 마세요. 성공을 정의하고 반복하세요.",
      "강력한 성공 기준은 독립적으로 반복할 수 있게 합니다.",
    ],
  },
  {
    title: "규칙 5 - 판단이 필요한 작업에만 모델을 사용하세요",
    items: [
      "나를 사용할 것: 분류, 초안 작성, 요약, 추출.",
      "나를 사용하지 말 것: 라우팅, 재시도, 결정론적 변환.",
      "코드가 답할 수 있다면, 코드가 답합니다.",
    ],
  },
  {
    title: "규칙 6 - 토큰 예산은 권고가 아니에요",
    items: [
      "작업당: 4,000 토큰.",
      "세션당: 30,000 토큰.",
      "예산에 가까워지면, 요약하고 새로 시작하세요.",
      "초과를 드러내세요. 조용히 초과하지 마세요.",
    ],
  },
  {
    title: "규칙 7 - 충돌은 드러내라, 평균내지 마세요",
    items: [
      "두 패턴이 충돌하면, 하나를 고르세요. 기준은 더 최신이거나 더 테스트된 것입니다.",
      "이유를 설명하세요.",
      "나머지는 정리 대상으로 표시하세요.",
      "충돌하는 패턴을 합치지 마세요.",
    ],
  },
  {
    title: "규칙 8 - 쓰기 전에 읽어보세요",
    items: [
      "코드를 추가하기 전에 exports, 직접 호출자, 공유 유틸리티를 읽어보세요.",
      "‘무관해 보인다’는 위험합니다.",
      "코드가 왜 그렇게 구조화됐는지 모르면 물어보세요.",
    ],
  },
  {
    title: "규칙 9 - 테스트는 행동이 아니라 의도를 검증합니다",
    items: [
      "테스트는 무엇을 하는지가 아니라, 왜 그 행동이 중요한지를 담아야 합니다.",
      "비즈니스 로직이 바뀔 때 실패하지 않는 테스트는 잘못된 것입니다.",
    ],
  },
  {
    title: "규칙 10 - 중요한 단계마다 체크포인트를 남깁니다",
    items: [
      "무엇을 했는지, 무엇이 확인됐는지, 무엇이 남았는지 요약하세요.",
      "나에게 다시 설명할 수 없는 상태에서 계속하지 마세요.",
      "흐름을 잃었다면, 멈추고 다시 정리하세요.",
    ],
  },
  {
    title: "규칙 11 - 동의하지 않더라도 코드베이스의 관행을 따르세요",
    items: [
      "코드베이스 안에서는, 준수 > 취향.",
      "관행이 해롭다고 생각한다면, 드러내세요.",
      "조용히 분기하지 마세요.",
    ],
  },
  {
    title: "규칙 12 - 크게 실패하세요",
    items: [
      "무언가 건너뛰어졌다면 ‘완료’는 틀린 말입니다.",
      "일부를 건너뛰었다면 ‘테스트 통과’는 틀린 말입니다.",
      "불확실성을 숨기지 말고 드러내는 것을 기본으로 삼으세요.",
    ],
  },
];

function getPostCategories(post) {
  return post.categories ?? [post.category];
}

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
      const postCategories = getPostCategories(post);
      const matchesCategory = activeCategory === "All" || postCategories.includes(activeCategory);
      const searchableText = [post.title, post.excerpt, ...postCategories, ...post.tags]
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

    if (tab === "blog") {
      setActiveCategory("All");
      setSearchTerm("");
      setCurrentPage(1);
    }
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
            aria-current={activeTab === "ai" ? "page" : undefined}
            className={activeTab === "ai" ? "is-active" : ""}
            type="button"
            onClick={() => handleTabChange("ai")}
          >
            AI
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
        ) : activeTab === "ai" ? (
          <AiPage />
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

function AiPage() {
  return (
    <section className="ai-page" aria-labelledby="ai-title">
      <header className="ai-heading">
        <h2 id="ai-title">AI 지침</h2>
        <p>작업할 때 사용하는 공통 원칙입니다.</p>
      </header>
      <div className="ai-guides">
        {aiGuidelines.map((guideline) => (
          <section className="ai-guide" key={guideline.title}>
            <h3>{guideline.title}</h3>
            <ul>
              {guideline.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
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
            <div className="category-list">
              {getPostCategories(post).map((category) => (
                <span className="content-label content-label-category" key={category}>
                  {category}
                </span>
              ))}
            </div>
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

      <nav
        className="post-navigation"
        aria-label="Post navigation"
        data-next={nextPost ? "true" : "false"}
        data-previous={previousPost ? "true" : "false"}
      >
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

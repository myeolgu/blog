import { useEffect, useMemo, useState } from "react";
import { ArrowUp, ChevronDown, Download, FileCode2, Folder, FolderTree, Search } from "lucide-react";
import { aiInstructionFiles, aiInstructionTree } from "./data/ai-instructions";
import { careerProjects } from "./data/career";
import { posts } from "./posts";

const categories = ["All", "HTML", "CSS", "JavaScript", "React", "Browser", "AI"];
const postsPerPage = 9;
const textEncoder = new TextEncoder();
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

function writeUint16(view, offset, value) {
  view.setUint16(offset, value, true);
}

function writeUint32(view, offset, value) {
  view.setUint32(offset, value, true);
}

function getCrc32(bytes) {
  let crc = 0xffffffff;

  for (const byte of bytes) {
    crc ^= byte;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function createZip(files) {
  const localFiles = [];
  const centralFiles = [];
  let offset = 0;

  for (const file of files) {
    const name = textEncoder.encode(file.path);
    const content = textEncoder.encode(file.content);
    const crc = getCrc32(content);
    const localFile = new Uint8Array(30 + name.length + content.length);
    const localView = new DataView(localFile.buffer);

    writeUint32(localView, 0, 0x04034b50);
    writeUint16(localView, 4, 20);
    writeUint32(localView, 14, crc);
    writeUint32(localView, 18, content.length);
    writeUint32(localView, 22, content.length);
    writeUint16(localView, 26, name.length);
    localFile.set(name, 30);
    localFile.set(content, 30 + name.length);
    localFiles.push(localFile);

    const centralFile = new Uint8Array(46 + name.length);
    const centralView = new DataView(centralFile.buffer);

    writeUint32(centralView, 0, 0x02014b50);
    writeUint16(centralView, 4, 20);
    writeUint16(centralView, 6, 20);
    writeUint32(centralView, 16, crc);
    writeUint32(centralView, 20, content.length);
    writeUint32(centralView, 24, content.length);
    writeUint16(centralView, 28, name.length);
    writeUint32(centralView, 42, offset);
    centralFile.set(name, 46);
    centralFiles.push(centralFile);
    offset += localFile.length;
  }

  const centralSize = centralFiles.reduce((size, file) => size + file.length, 0);
  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);

  writeUint32(endView, 0, 0x06054b50);
  writeUint16(endView, 8, files.length);
  writeUint16(endView, 10, files.length);
  writeUint32(endView, 12, centralSize);
  writeUint32(endView, 16, offset);

  return new Blob([...localFiles, ...centralFiles, endRecord], { type: "application/zip" });
}

function downloadAiInstructions() {
  const archive = createZip(aiInstructionFiles);
  const url = URL.createObjectURL(archive);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ai-instructions.zip";
  link.click();
  URL.revokeObjectURL(url);
}

function downloadInstruction(file) {
  const url = URL.createObjectURL(new Blob([file.content], { type: "text/markdown;charset=utf-8" }));
  const link = document.createElement("a");

  link.href = url;
  link.download = file.path.split("/").at(-1);
  link.click();
  URL.revokeObjectURL(url);
}

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
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  if (!selectedInstruction) {
    return (
      <section className="ai-page" aria-labelledby="ai-title">
        <header className="ai-heading">
          <div>
            <h2 id="ai-title">AI 지침 지도</h2>
            <p>프로젝트 작업에 사용할 AI 지침을 <code>.codex/skills/</code>에 분류해 정리합니다.</p>
          </div>
          <button className="ai-download" type="button" onClick={downloadAiInstructions}>
            <Download aria-hidden="true" size={17} />
            AI 지침 다운로드
          </button>
        </header>
        <div className="ai-map" aria-label="Codex 작업 지침 마인드맵">
          <div className="map-toolbar">
            <span className="map-toolbar-path">BLOG <b>/</b> .codex <b>/</b> skills</span>
            <span className="map-toolbar-status">CODEX SKILLS</span>
          </div>
          <div className="map-tree">
            {aiInstructionTree.children.map((node) => (
              <InstructionTree key={node.name} node={node} onOpenFile={setSelectedInstruction} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-page ai-page-detail" aria-labelledby="ai-title">
      <header className="ai-heading">
        <div>
          <h2 id="ai-title">{selectedInstruction.path}</h2>
          <p>AI 지침 지도와 다운로드 ZIP에 동일하게 포함되는 원본 파일입니다.</p>
        </div>
        <button className="ai-download" type="button" onClick={() => downloadInstruction(selectedInstruction)}>
          MD 다운로드
        </button>
      </header>
      <div className="ai-guides">
        <section className="ai-guide" aria-label="Codex 작업 지침">
          <pre>{selectedInstruction.content}</pre>
        </section>
      </div>
      <nav className="post-navigation" aria-label="AI 지침 탐색" data-next="false" data-previous="false">
        <button className="post-navigation-list" type="button" onClick={() => setSelectedInstruction(null)}>
          목록으로
        </button>
      </nav>
    </section>
  );
}

function InstructionTree({ node, onOpenFile }) {
  const [isOpen, setIsOpen] = useState(node.name === "ai");
  const isFile = Boolean(node.file);

  if (isFile) {
    return (
      <button className="map-file" type="button" onClick={() => onOpenFile(node.file)}>
        <FileCode2 aria-hidden="true" size={17} />
        <span>{node.name}</span>
      </button>
    );
  }

  const FolderIcon = node.name === ".codex" ? FolderTree : Folder;

  return (
    <div className="map-folder">
      <button aria-expanded={isOpen} className="map-folder-head" type="button" onClick={() => setIsOpen((open) => !open)}>
        <FolderIcon aria-hidden="true" size={node.name === "ai" ? 24 : 20} />
        <span>{node.name}</span>
        <ChevronDown aria-hidden="true" className={isOpen ? "map-chevron is-open" : "map-chevron"} size={18} />
      </button>
      <div className={isOpen ? "map-children is-open" : "map-children"}>
        <div>
          {node.children.map((child) => (
            <InstructionTree key={child.name} node={child} onOpenFile={onOpenFile} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CareerPage() {
  return (
    <section className="career-page" aria-labelledby="career-title">
      <p className="eyebrow">Career</p>
      <h2 id="career-title">주엽의 커리어</h2>
      <p className="career-intro">프로젝트 경험과 사용 기술을 시간순으로 정리했습니다.</p>
      <section className="career-company" aria-labelledby="etribe-title">
        <header>
          <p>Company</p>
          <h3 id="etribe-title">이트라이브</h3>
        </header>
        <ol className="career-timeline">
          {careerProjects.map((project) => (
            <li className="career-entry" key={`${project.period}-${project.title}`}>
              <time>{project.period}</time>
              <div className="career-card">
                <h4>{project.title}</h4>
                <p>{project.summary}</p>
                {project.responsibilities && (
                  <ul>
                    {project.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                )}
                {project.stack && (
                  <div className="career-stack" aria-label="기술 스택">
                    {project.stack.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [showTopButton, setShowTopButton] = useState(false);
  const isPostView = pathname.startsWith("/posts/");
  const isAiTab = pathname.startsWith("/ai");

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 240);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={isPostView ? "app-shell post-view" : "app-shell"}>
      <header className="site-header">
        <h1 className="brand-heading">
          <Link className="brand" href="/">
            주엽 기록실.log
          </Link>
        </h1>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link aria-current={isAiTab ? undefined : "page"} className={isAiTab ? "" : "is-active"} href="/">
            Blog
          </Link>
          <Link aria-current={isAiTab ? "page" : undefined} className={isAiTab ? "is-active" : ""} href="/ai">
            AI
          </Link>
        </nav>
      </header>

      {children}

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

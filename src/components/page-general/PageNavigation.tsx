"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface PageNavigationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ page, totalPages, setPage }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isJumpOpen, setIsJumpOpen] = useState(false);
  const [jumpValue, setJumpValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    const sync = () => setIsMobile(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  const pagesToRender = useMemo(() => {
    if (!isMobile || totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page >= totalPages) {
      return [1, "...", totalPages] as const;
    }

    return [page, "...", totalPages] as const;
  }, [isMobile, page, totalPages]);

  useEffect(() => {
    setIsJumpOpen(false);
  }, [page]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsJumpOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const submitJump = () => {
    const parsed = Number(jumpValue);
    if (!Number.isInteger(parsed)) return;
    const nextPage = Math.max(1, Math.min(totalPages, parsed));
    setPage(nextPage);
    setJumpValue("");
    setIsJumpOpen(false);
  };

  return (
    <div className="pagenav-container" ref={containerRef}>
      <button
        className={`pagenav-btn pagenav-prev${page === 1 ? " pagenav-disabled" : ""}`}
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      {pagesToRender.map((item, idx) => {
        if (item === "...") {
          return (
            <button
              key={`ellipsis-${idx}`}
              className="pagenav-btn pagenav-ellipsis"
              onClick={() => setIsJumpOpen((prev) => !prev)}
              aria-label="Jump to page"
            >
              ...
            </button>
          );
        }

        return (
          <button
            key={item}
            className={`pagenav-btn pagenav-page${page === item ? " pagenav-active" : ""}`}
            onClick={() => setPage(item)}
            disabled={page === item}
          >
            {item}
          </button>
        );
      })}
      <button
        className={`pagenav-btn pagenav-next${page === totalPages ? " pagenav-disabled" : ""}`}
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
      {isJumpOpen && (
        <div className="pagenav-jump-popover" role="dialog" aria-label="Jump to page">
          <label htmlFor="pagenav-jump-input" className="pagenav-jump-label">
            Jump To Page
          </label>
          <div className="pagenav-jump-row">
            <input
              id="pagenav-jump-input"
              className="pagenav-jump-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value.replace(/[^0-9]/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitJump();
                }
              }}
              placeholder={`1-${totalPages}`}
            />
            <button className="pagenav-btn pagenav-jump-go" onClick={submitJump}>
              Go
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageNavigation;

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import SiteNavbar from "../../src/components/page-general/SiteNavbar";
import SiteFooter from "../../src/components/page-general/SiteFooter";
import PageSummary from "../../src/components/page-general/PageSummary";
import Loader from "../../src/components/page-general/Loader";
import Article, { ArticleLink } from "../../src/components/page-specific/Article";
import PageNavigation from "../../src/components/page-general/PageNavigation";

export default function ArticlesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [links, setLinks] = useState<ArticleLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      try {
        const mdResponse = await fetch("/api/articles");
        const mdArticles = await mdResponse.json();

        const allArticles = [...mdArticles].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        if (isMounted) {
          setLinks(allArticles);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  const ARTICLES_PER_PAGE = 5;
  const totalPages = Math.ceil(links.length / ARTICLES_PER_PAGE);

  useEffect(() => {
    const syncPageFromUrl = () => {
      const rawPage = new URLSearchParams(window.location.search).get("page");
      const parsedPage = rawPage ? Number(rawPage) : 1;
      const nextPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
      setPage(nextPage);
    };

    syncPageFromUrl();
    window.addEventListener("popstate", syncPageFromUrl);
    return () => {
      window.removeEventListener("popstate", syncPageFromUrl);
    };
  }, []);

  useEffect(() => {
    if (loading || totalPages < 1) {
      return;
    }

    if (page > totalPages) {
      setPage(totalPages);
      const params = new URLSearchParams(window.location.search);
      params.set("page", String(totalPages));
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }, [loading, page, pathname, router, totalPages]);

  const handlePageChange = (nextPage: number) => {
    const safeTotal = totalPages > 0 ? totalPages : 1;
    const safePage = Math.max(1, Math.min(safeTotal, nextPage));
    setPage(safePage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(safePage));
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const startIdx = (page - 1) * ARTICLES_PER_PAGE;
  const endIdx = startIdx + ARTICLES_PER_PAGE;
  const currentArticles = links.slice(startIdx, endIdx);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <SiteNavbar />
      <main>
        <PageSummary
          title="Publications"
          description="Selected writing and publication work. Legacy and current articles are included here for review."
        />
        {currentArticles.map((article, idx) => (
          <Article key={startIdx + idx} {...article} />
        ))}
        <PageNavigation page={page} totalPages={totalPages} setPage={handlePageChange} />
      </main>
      <SiteFooter />
    </>
  );
}

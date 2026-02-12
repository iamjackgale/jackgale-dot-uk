import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

type FeedArticle = {
  href: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
};

type RemoteArticle = {
  link?: string;
  title?: string;
  date?: string;
  category?: string;
  description?: string;
  image?: string;
};

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}

function canonicalizeUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    const hostname = parsed.hostname.toLowerCase();
    if (hostname === "staworth.com") {
      parsed.hostname = "www.staworth.com";
    }
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return rawUrl.trim();
  }
}

function resolveUrl(rawUrl?: string): string | null {
  if (!rawUrl) {
    return null;
  }
  const value = rawUrl.trim();
  if (!value) {
    return null;
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return canonicalizeUrl(value);
  }
  if (value.startsWith("/")) {
    return canonicalizeUrl(`https://www.staworth.com${value}`);
  }
  return canonicalizeUrl(value);
}

function resolveImage(rawImage?: string): string {
  if (!rawImage) {
    return "/logos/jack-gale-mark.png";
  }
  const value = rawImage.trim();
  if (!value) {
    return "/logos/jack-gale-mark.png";
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  if (value.startsWith("/")) {
    return `https://www.staworth.com${value}`;
  }
  return `https://www.staworth.com/${value}`;
}

function formatMdDate(rawDate: unknown): string {
  if (typeof rawDate !== "string" || !rawDate.trim()) {
    return "";
  }

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return rawDate;
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function normalizeLocalImage(rawImage?: string): string {
  if (!rawImage) {
    return "/logos/jack-gale-mark.png";
  }
  return rawImage
    .replace(/^\.\.\/\.\.\/\.\.\/public/, "")
    .replace(/^public/, "");
}

function extractFirstMarkdownUrl(markdown: string): string | null {
  const markdownLinkMatch = markdown.match(/\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/i);
  if (markdownLinkMatch && markdownLinkMatch[1]) {
    return markdownLinkMatch[1];
  }
  const plainUrlMatch = markdown.match(/https?:\/\/[^\s)]+/i);
  return plainUrlMatch ? plainUrlMatch[0] : null;
}

function loadMarkdownArticles(): FeedArticle[] {
  const articlesDir = path.join(process.cwd(), "src/content/articles");
  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  const files = fs.readdirSync(articlesDir).filter((name) => name.endsWith(".md"));

  return files
    .map((file) => {
      const filePath = path.join(articlesDir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      const firstUrl = extractFirstMarkdownUrl(content);
      const href = resolveUrl(
        data.link ||
          data.href ||
          data.url ||
          data.external_url ||
          data.canonical_url ||
          firstUrl ||
          ""
      );

      if (!href) {
        return null;
      }

      const tags = Array.isArray(data.tags)
        ? data.tags.map((tag) => String(tag).toUpperCase())
        : [];
      const category = tags[0] || "ARTICLE";

      return {
        href,
        title: String(data.title || file.replace(/\.md$/, "")),
        date: formatMdDate(data.date),
        category,
        tags: tags.length > 0 ? tags : [category],
        description: String(data.short_description || ""),
        image: normalizeLocalImage(data.preview_image || data.header_image),
      } as FeedArticle;
    })
    .filter((article): article is FeedArticle => Boolean(article));
}

async function loadRemoteArticles(url: string): Promise<FeedArticle[]> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    const items = (await response.json()) as RemoteArticle[];
    return items
      .map((item) => {
        const href = resolveUrl(item.link);
        if (!href) {
          return null;
        }
        const category = (item.category || "ARTICLE").toUpperCase();
        return {
          href,
          title: item.title || "Untitled",
          date: item.date || "",
          category,
          tags: [category],
          description: item.description || "",
          image: resolveImage(item.image),
        } as FeedArticle;
      })
      .filter((article): article is FeedArticle => Boolean(article));
  } catch {
    return [];
  }
}

function loadLegacyArticles(): FeedArticle[] {
  const legacyPath = path.join(process.cwd(), "archive/pre-refactor-static-site/products.html");
  if (!fs.existsSync(legacyPath)) {
    return [];
  }

  const html = fs.readFileSync(legacyPath, "utf8");
  const blocks = html.match(/<div class="blog-preview">[\s\S]*?<\/a><\/div>/g) || [];

  return blocks
    .map((block) => {
      const href = resolveUrl(block.match(/<a class="blog-link" href="([^"]+)"/i)?.[1]);
      if (!href) {
        return null;
      }

      const title = (block.match(/<p class="blog-header">([\s\S]*?)<\/p>/i)?.[1] || "Untitled")
        .replace(/<[^>]+>/g, "")
        .trim();
      const date = (block.match(/<p class="blog-date">([\s\S]*?)<\/p>/i)?.[1] || "")
        .replace(/<[^>]+>/g, "")
        .trim();
      const category = (
        block.match(/<p class="blog-category">([\s\S]*?)<\/p>/i)?.[1] || "ARCHIVE"
      )
        .replace(/<[^>]+>/g, "")
        .trim()
        .toUpperCase();
      const description = (
        block.match(/<p class="blog-description">([\s\S]*?)<\/p>/i)?.[1] || ""
      )
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
      const imageRaw = block.match(/<img class ="blog-image" src="([^"]+)"/i)?.[1] || "";
      const image = imageRaw
        ? imageRaw.startsWith("images/productions/")
          ? `/images/articles/legacy/${imageRaw.replace("images/productions/", "")}`
          : imageRaw
        : "/logos/jack-gale-mark.png";

      return {
        href,
        title,
        date,
        category: category || "ARCHIVE",
        tags: [category || "ARCHIVE"],
        description,
        image,
      } as FeedArticle;
    })
    .filter((article): article is FeedArticle => Boolean(article));
}

function mergeByPriority(sources: FeedArticle[][]): FeedArticle[] {
  const merged: FeedArticle[] = [];
  const seenLinks = new Set<string>();
  const seenTitles = new Set<string>();

  for (const source of sources) {
    for (const article of source) {
      const linkKey = canonicalizeUrl(article.href);
      const titleKey = normalizeText(article.title);
      if (seenLinks.has(linkKey) || (titleKey && seenTitles.has(titleKey))) {
        continue;
      }

      seenLinks.add(linkKey);
      if (titleKey) {
        seenTitles.add(titleKey);
      }
      merged.push(article);
    }
  }

  return merged;
}

export async function GET() {
  try {
    const [mdArticles, previewArticles, apiArticles, legacyArticles] = await Promise.all([
      Promise.resolve(loadMarkdownArticles()),
      loadRemoteArticles("https://www.staworth.com/articles/previews"),
      loadRemoteArticles("https://api.staworth.com/articles"),
      Promise.resolve(loadLegacyArticles()),
    ]);

    const articles = mergeByPriority([mdArticles, previewArticles, apiArticles, legacyArticles]);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error building articles feed:", error);
    return NextResponse.json([]);
  }
}

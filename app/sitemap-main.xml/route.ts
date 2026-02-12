import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jackgale.co.uk";

  type SitemapEntry = {
    url: string;
    lastModified?: string;
    changeFrequency: string;
    priority: number;
  };

  const staticPages: SitemapEntry[] = [
    { url: baseUrl, changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/presence`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/articles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/experience`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const allPages = [...staticPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>${page.lastModified ? `\n    <lastmod>${page.lastModified}</lastmod>` : ""}
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

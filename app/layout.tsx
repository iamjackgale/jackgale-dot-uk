import "../styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jackgale.co.uk";

export const metadata: Metadata = {
  title: "Jack Gale",
  description:
    "Personal site of Jack Gale: legal and Web3 work, publications, online presence, and experience.",
  keywords: ["Jack Gale", "Web3", "DAO", "legal", "articles", "presence", "experience"],
  authors: [{ name: "Jack Gale" }],
  openGraph: {
    title: "Jack Gale",
    description:
      "Legal and Web3 work, publications, links, and experience.",
    url: siteUrl,
    siteName: "Jack Gale",
    images: [
      {
        url: `${siteUrl}/images/about/2023yorkshirelonghorn.png`,
        width: 1200,
        height: 630,
        alt: "Jack Gale",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Gale",
    description: "Legal and Web3 work, publications, links, and experience.",
    images: [`${siteUrl}/images/about/2023yorkshirelonghorn.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const contactEmail = process.env.CONTACT_TO_EMAIL || "jack.gale@icloud.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Jack Gale",
    url: siteUrl,
    image: `${siteUrl}/images/about/2023yorkshirelonghorn.png`,
    email: contactEmail,
    sameAs: [
      "https://x.com/iamjackgale",
      "https://github.com/iamjackgale",
      "https://www.linkedin.com/in/iamjackgale",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
  const savedTheme = window.localStorage.getItem("theme");
  const resolvedTheme = savedTheme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", resolvedTheme);
} catch (_) {}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

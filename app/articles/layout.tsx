import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jackgale.co.uk";

export const metadata: Metadata = {
  title: "Articles | Jack Gale",
  description: "Articles and publications by Jack Gale.",
  authors: [{ name: "Jack Gale" }],
  alternates: {
    canonical: `${siteUrl}/articles`,
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jackgale.co.uk";

export const metadata: Metadata = {
  title: "Presence | Jack Gale",
  description: "Explore Jack Gale's online presence and contact points.",
  authors: [{ name: "Jack Gale" }],
  alternates: {
    canonical: `${siteUrl}/presence`,
  },
};

export default function PresenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

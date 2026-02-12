import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jackgale.co.uk";

export const metadata: Metadata = {
  title: "Privacy Policy | Jack Gale",
  description: "Privacy policy and personal data handling information.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

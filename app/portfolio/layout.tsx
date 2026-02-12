import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Jack Gale",
  description: "Portfolio route retained for compatibility and redirected to articles.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

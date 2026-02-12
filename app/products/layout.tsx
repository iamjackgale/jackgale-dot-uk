import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Jack Gale",
  description: "Product and publication index.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

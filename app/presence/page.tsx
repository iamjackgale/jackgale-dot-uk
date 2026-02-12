import Link from "next/link";

import SiteNavbar from "../../src/components/page-general/SiteNavbar";
import SiteFooter from "../../src/components/page-general/SiteFooter";
import PageSummary from "../../src/components/page-general/PageSummary";
import PageLoaderGate from "../../src/components/page-general/PageLoaderGate";
import PresenceLink from "../../src/components/page-specific/PresenceLink";

const LINKS = [
  { href: "https://jackgale.uk", img: "/images/links/legacy/www.png", label: "jackgale.uk" },
  { href: "https://app.ens.domains/jackgale.eth", img: "/images/links/legacy/ethereum.png", label: "jackgale.eth" },
  { href: "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/24449492458968833421536596280904016526375682881653999429086006215721286107137", img: "/images/links/legacy/the-yorkshire-longhorn-outline-circle.png", label: "The Yorkshire Longhorn" },
  { href: "https://beefy.com", img: "/images/links/legacy/beefy.png", label: "Beefy" },
  { href: "https://discordapp.com/users/827986666051731478", img: "/images/links/legacy/discord.png", label: "Discord" },
  { href: "https://t.me/iamjackgale", img: "/images/links/legacy/telegram.png", label: "Telegram" },
  { href: "https://warpcast.com/iamjackgale", img: "/images/links/legacy/farcaster.png", label: "Farcaster" },
  { href: "https://www.lensfrens.xyz/jackgale.lens", img: "/images/links/legacy/lens.png", label: "Lens" },
  { href: "https://twitter.com/iamjackgale", img: "/images/links/legacy/x.png", label: "X" },
  { href: "https://www.reddit.com/user/iamjackgale", img: "/images/links/legacy/reddit.png", label: "Reddit" },
  { href: "https://github.com/iamjackgale", img: "/images/links/legacy/github.png", label: "GitHub" },
  { href: "https://youtube.com/@iamjackgale", img: "/images/links/legacy/youtube.png", label: "YouTube" },
  { href: "https://www.linkedin.com/in/iamjackgale", img: "/images/links/legacy/linkedin.png", label: "LinkedIn" },
  { href: "https://open.spotify.com/user/115655834", img: "/images/links/legacy/spotify.png", label: "Spotify" },
  { href: "https://soundcloud.com/iamjackgale", img: "/images/links/legacy/soundcloud.png", label: "SoundCloud" },
  { href: "https://www.discogs.com/user/iamjackgale", img: "/images/links/legacy/discogs.svg", label: "Discogs" },
];

const LINKS_PER_PAGE = 6;

type PresencePageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

function buildPresenceHref(page: number) {
  return `/presence?page=${page}`;
}

export default async function PresencePage({ searchParams }: PresencePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const pageParam = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams?.page[0]
    : resolvedSearchParams?.page;

  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const totalPages = Math.ceil(LINKS.length / LINKS_PER_PAGE);
  const page = Number.isNaN(requestedPage) ? 1 : Math.min(Math.max(requestedPage, 1), totalPages);

  const startIdx = (page - 1) * LINKS_PER_PAGE;
  const endIdx = startIdx + LINKS_PER_PAGE;
  const currentLinks = LINKS.slice(startIdx, endIdx);

  return (
    <>
      <SiteNavbar />
      <PageLoaderGate minDurationMs={800}>
        <PageSummary
          title="Presence"
          description="Explore my internet footprint, and learn more about my life, work, hobbies and interests."
        />
        {currentLinks.map((link, idx) => (
          <PresenceLink key={idx} href={link.href} img={link.img} label={link.label} />
        ))}
        <div className="pagenav-container">
          {page > 1 ? (
            <Link className="pagenav-btn" href={buildPresenceHref(page - 1)}>
              Previous
            </Link>
          ) : (
            <span className="pagenav-btn pagenav-disabled">Previous</span>
          )}
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === page;

            return isActive ? (
              <span key={pageNum} className="pagenav-btn pagenav-active">
                {pageNum}
              </span>
            ) : (
              <Link key={pageNum} className="pagenav-btn" href={buildPresenceHref(pageNum)}>
                {pageNum}
              </Link>
            );
          })}
          {page < totalPages ? (
            <Link className="pagenav-btn" href={buildPresenceHref(page + 1)}>
              Next
            </Link>
          ) : (
            <span className="pagenav-btn pagenav-disabled">Next</span>
          )}
        </div>
        <SiteFooter />
      </PageLoaderGate>
    </>
  );
}

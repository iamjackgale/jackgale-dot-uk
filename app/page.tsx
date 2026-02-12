"use client";

import Image from "next/image";
import Link from "next/link";

import SiteNavbar from "../src/components/page-general/SiteNavbar";
import SiteFooter from "../src/components/page-general/SiteFooter";
import PageLoaderGate from "../src/components/page-general/PageLoaderGate";

const ABOUT_ROWS = [
  {
    title: "Before Staworth",
    body: [
      "Growing up, I moved around a lot. From Wales to Yorkshire, Leicestershire to Cambridge, embracing change became my normality. I found certainty in knowledge and my hobbies, and this sowed the seeds of a fierce independence.",
      "My education was passionate and expansive. Through a series of great teachers and mentors, I was able to embrace opportunities to grow far beyond the curriculum. I thrived in juggling many subjects and leveraging the intersections between them.",
      "My ambitions were divided between engineering and law; either way, I wanted to grapple with complex problems and systems. In 2013, I matriculated to Van Mildert College at Durham University to study law as an undergraduate. Those 3 years of study proved to be some of the best of my life.",
      "After graduating, I moved to Leeds to begin a legal career. I completed a training contract at a legendary Leeds firm — Walker Morris LLP — qualifying to practice Commercial, Competition and Technology law. As you'll see in the photo above, I was happy to be building a broad legal practice in fields I felt passionate about.",
      "But still something else called to me..."
    ],
    image: "/images/about/2018wm.png",
    alt: "Jack Gale in 2018",
    align: "left",
  },
  {
    title: "Staworth",
    body: [
      "Between my legal studies, I was drawn to learn some programming. I'd always had a passion for math and computers, and felt confident I could learn to automate the boring stuff with enough time and effort. Through studying software, I learned about open source, and the DeFi revolution that was only just beginning",
      "I began devouring spare time learning about DeFi protocols and volunteering to support open-source communities. Those early contributions proved valuable, and I soon found myself a regular fixture at the forefront of new business initiatives and representing projects at conferences.",
      "As funding opportunities emerged, I realised I had a serious business on my hands. I was also exhausted from juggling a full legal practice and a growing business on the side. It was time to fly the nest and say goodbye to the traditional legal career.",
      "I founded Staworth in March 2024 as a vehicle for supporting Web 3.0 projects and communities to interface with the traditional world. As a staunch advocate for their interests, I am to help the industry flourish through my own brand of prudent stewardship, careful risk management, and transparent finance."
    ],
    image: "/images/about/2023yorkshirelonghorn.png",
    alt: "The Yorkshire Longhorn",
    align: "left",
  },
] as Array<{
  title: string;
  body: string | string[];
  image: string;
  alt: string;
  align: "left" | "right";
}>;

export default function HomePage() {
  const NAVBAR_HEIGHT = 64;
  const FOOTER_HEIGHT = 26;

  const getSectionScrollDistance = () => {
    return Math.max(0, window.innerHeight - NAVBAR_HEIGHT - FOOTER_HEIGHT);
  };

  const scrollOnePage = () => {
    window.scrollBy({ top: getSectionScrollDistance(), behavior: "smooth" });
  };

  const scrollLowerSection = () => {
    window.scrollBy({ top: getSectionScrollDistance(), behavior: "smooth" });
  };

  const scrollBackToTop = () => {
    window.scrollBy({ top: -(getSectionScrollDistance() * 2), behavior: "smooth" });
  };

  return (
    <PageLoaderGate minDurationMs={800}>
      <>
        <SiteNavbar />
        <main className="about-main">
          <section className="about-opening">
            <div className="about-opening-content">
              <section className="about-intro-image-row">
                <div className="about-image-wrap">
                  <Image
                    src="/images/about/2025dappcon.png"
                    alt="Jack Gale at DappCon 2025"
                    width={1200}
                    height={800}
                    className="about-image"
                  />
                </div>
              </section>
              <section className="about-intro-copy">
                <h2>Hi, I&apos;m Jack!</h2>
                <p className="about-intro-tagline">Lawyer, writer, investor and technophile.</p>
                <p className="about-intro-detail">
                  Welcome to my site — a hub for information about my life and work, where you&apos;ll
                  find everything you need to get to know me.
                </p>
                <p className="about-intro-detail">
                  Below, you can read a brief history of my journey so far.
                  The rest of the site then dives deeper into my work and footprint:
                </p>
                <div className="about-intro-actions">
                  <Link href="/presence" className="pill-link">Presence</Link>
                  <Link href="/articles" className="pill-link">Articles</Link>
                  <Link href="/experience" className="pill-link">Experience</Link>
                </div>
              </section>
            </div>
            <button
              type="button"
              className="about-scroll-button"
              onClick={scrollOnePage}
              aria-label="Scroll down one page"
              title="Scroll down"
            >
              ▼
            </button>
          </section>
          {ABOUT_ROWS.map((row, index) => (
            <section
              key={row.title}
              className={`about-row${index === 0 ? " about-row-gap-after" : ""}`}
            >
              <div className="about-row-content">
                <div className="about-image-wrap">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    width={1200}
                    height={800}
                    className="about-image"
                  />
                </div>
                <div className="about-copy">
                  <h2>{row.title}</h2>
                  <div className="about-copy-body">
                    {(Array.isArray(row.body) ? row.body : [row.body]).map((paragraph, paragraphIndex) => (
                      <p key={`${row.title}-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
              {index === 0 && (
                <button
                  type="button"
                  className="about-section-scroll-button"
                  onClick={scrollLowerSection}
                  aria-label="Scroll down to next section"
                  title="Scroll down"
                >
                  ▼
                </button>
              )}
              {index === ABOUT_ROWS.length - 1 && (
                <button
                  type="button"
                  className="about-section-scroll-button"
                  onClick={scrollBackToTop}
                  aria-label="Scroll back to top"
                  title="Scroll to top"
                >
                  ▲
                </button>
              )}
            </section>
          ))}
        </main>
        <SiteFooter />
      </>
    </PageLoaderGate>
  );
}

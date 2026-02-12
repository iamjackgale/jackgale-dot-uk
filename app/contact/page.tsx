import Link from "next/link";

import SiteNavbar from "../../src/components/page-general/SiteNavbar";
import SiteFooter from "../../src/components/page-general/SiteFooter";
import PageSummary from "../../src/components/page-general/PageSummary";

export default function ContactPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || "jack.gale@icloud.com";
  const mailtoHref = `mailto:${contactEmail}`;

  return (
    <>
      <SiteNavbar />
      <PageSummary
        title="Contact"
        description="Reach out directly by email. Contact form API integration has been intentionally removed for this refactor."
      />
      <main className="contact-main">
        <section className="contact-card">
          <p className="contact-privacy-note" style={{ marginTop: 0 }}>
            Email: <a href={mailtoHref}>{contactEmail}</a>
          </p>
          <div className="contact-actions">
            <a className="contact-button contact-button-secondary" href={mailtoHref}>
              Email Jack
            </a>
            <Link className="contact-button" href="/presence">
              More Links
            </Link>
          </div>
          <p className="contact-privacy-note">
            Data handling details can be found in the <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

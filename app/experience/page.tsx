import SiteNavbar from "../../src/components/page-general/SiteNavbar";
import SiteFooter from "../../src/components/page-general/SiteFooter";
import PageSummary from "../../src/components/page-general/PageSummary";
import PageLoaderGate from "../../src/components/page-general/PageLoaderGate";
import {
  EducationSection,
  HonoursAndAwardsSection,
  LegalSection,
  ProfileSection,
  SkillsAndLanguagesSection,
  Web3Section,
} from "./components/ExperienceSections";

export default function ExperiencePage() {
  return (
    <PageLoaderGate minDurationMs={800}>
      <SiteNavbar />
      <PageSummary
        title="Experience"
        description={
          <>
            A short-form résumé of my work history, industry experience, academic studies & skillset.
            For more details, please visit{" "}
            <a href="https://www.linkedin.com/in/iamjackgale/" target="_blank" rel="noreferrer">
              my LinkedIn profile
            </a>
            .
          </>
        }
      />
      <main className="experience-main">
        <ProfileSection />
        <Web3Section />
        <LegalSection />
        <EducationSection />
        <SkillsAndLanguagesSection />
        <HonoursAndAwardsSection />
      </main>
      <SiteFooter />
    </PageLoaderGate>
  );
}

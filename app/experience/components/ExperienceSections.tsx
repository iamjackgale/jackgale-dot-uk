import CollapsibleExperienceSection from "./CollapsibleExperienceSection";
import ExperienceItem from "./ExperienceItem";
import ExperienceSectionBody from "./ExperienceSectionBody";

export function ProfileSection() {
  return (
    <CollapsibleExperienceSection
      title={
        <a href="https://www.staworth.com/" target="_blank" rel="noreferrer">
          Staworth Limited
        </a>
      }
    >
      <ExperienceSectionBody>
        <div className="profile-copy">
          <p>
            In 2024, I founded{" "}
            <a href="https://www.staworth.com/" target="_blank" rel="noreferrer">
              Staworth Limited
            </a>{" "}
            to advocate for and support open-source software developers and organisations, with a
            focus on helping teams interface with business, legal, and financial systems.
          </p>
          <p>
            <a href="https://www.staworth.com/" target="_blank" rel="noreferrer">
              Staworth
            </a>{" "}
            unites my legal practice with my passion and experience for Web 3.0 technologies. It
            also provides a vehicle for expansion and experimentation, particularly for building
            build productised services to replace and augment the professional support that has
            always been a core aspect of my practice.
          </p>
          <p>
            The vision for{" "}
            <a href="https://www.staworth.com/" target="_blank" rel="noreferrer">
              Staworth
            </a>{" "}
            is to build a trusted business and brand that's native to Web 3.0 and practices the
            benefits which the industry preaches. Follow along with the journey through our{" "}
            <a href="https://www.staworth.com/" target="_blank" rel="noreferrer">
              articles page
            </a>
            .
          </p>
        </div>
      </ExperienceSectionBody>
    </CollapsibleExperienceSection>
  );
}

export function Web3Section() {
  return (
    <CollapsibleExperienceSection title="Web 3.0 Experience">
      <ExperienceItem
        org="Beefy"
        orgHref="https://beefy.com/"
        title="Core Contributor"
        period="April 2023 - Present"
        description="Core contributor supporting legal, finance, and governance work for the multichain DeFi protocol."
      />

      <ExperienceItem
        org="The Accountant Quits"
        orgHref="https://www.theaccountantquits.com/"
        title="Instructor"
        period="September 2025 - Present"
        description="Teaching the fundamentals of blockchains, DeFi, and onchain business/economics for professionals entering the industry."
      />

      <ExperienceItem
        org="Gnosis VPN"
        orgHref="https://gnosisvpn.com/"
        title="Steering Committee Member"
        period="October 2025 - Present"
        description="Elected under GIP-129 to represent GnosisDAO on the project steering committee, helping oversee strategic decisions, multi-sig operations, and project communications in the DAO's interests."
      />

      <ExperienceItem
        org="GnosisDAO"
        orgHref="https://docs.gnosis.io/docs/intro"
        title="Elected Delegate"
        period="July 2024 - October 2025"
        description="Elected to contribute expert review and decision-making across DAO governance proposals while supporting the quality and integrity of the governance process."
      />

      <ExperienceItem
        org="kpk"
        orgHref="https://kpk.io/"
        title="Contributor"
        period="October 2024 - October 2025"
        description="Contributed to content, marketing, and messaging as part of contractor support delivered through Staworth."
      />
    </CollapsibleExperienceSection>
  );
}

export function LegalSection() {
  return (
    <CollapsibleExperienceSection title="Legal Experience">
      <ExperienceItem
        org="Walker Morris LLP"
        orgHref="https://www.walkermorris.co.uk/"
        title="Senior Associate Solicitor"
        period="August 2018 - January 2025"
        description="Completed a training contract across six areas: Banking; Secondment; Insolvency; Commercial; Energy & Infrastructure; and Competition. Qualified in August 2020 into a broad practice spanning Commercial, Competition, and Technology work. Transitioned to a consultant role after setting up Staworth in August 2024."
      />

      <ExperienceItem
        org="Starbucks"
        orgHref="https://www.starbucks.co.uk/"
        title="Corporate Counsel (Seconded)"
        period="March 2021 - May 2021"
        description="Seconded to Starbucks UK's legal team, drafting, negotiating, and advising on commercial contracts and legal issues affecting the business."
      />

      <ExperienceItem
        org="Jet2"
        orgHref="https://www.jet2.com/"
        title="Trainee Solicitor (Seconded)"
        period="January 2019 - May 2019"
        description="Worked in Jet2 Plc's in-house legal team, evaluating and drafting commercial contracts and advising on legal issues across the group."
      />

      <ExperienceItem
        org="3volution"
        orgHref="https://3volution.co.uk/"
        title="Paralegal (Commercial & Technology)"
        period="May 2017 - September 2017"
        description="Worked across IP, IT, and commercial matters from research and drafting to fee earning and client communications."
      />

      <details className="legal-work-experience">
        <summary>
          <strong>Work Experience</strong>
        </summary>
        <p>Completed a variety of legal work experience alongside education:</p>
        <ul>
          <li>Parklane Plowden Chambers - Mini-Pupillage (July 2014)</li>
          <li>Trinity Chambers, Barristers - Mini-Pupillage (July 2014)</li>
          <li>Durham Crown Court - Marshalling Placement (May 2014)</li>
          <li>Cambridge Family Law Practice LLP - Work Experience (August 2012)</li>
        </ul>
      </details>
    </CollapsibleExperienceSection>
  );
}

export function EducationSection() {
  return (
    <CollapsibleExperienceSection title="Education">
      <ExperienceItem
        org="BPP Law School"
        title="Legal Practice Course (LPC), Law"
        period="2017 - 2018"
        description="Qualified with Merit. Optional modules in Commercial & IP Law, Mergers & Acquisitions and Corporate Finance. Completed all core LPC modules."
      />

      <ExperienceItem
        org="University of Durham"
        title="Bachelor of Laws (LL.B.), Law (M101)"
        period="2013 - 2016"
        description="Upper Second Class Honours. Dissertation in UK Constitutional Law. Specialisms in Constitutional Law, Human Rights and International Law. Completed all core LLB modules."
      />

      <ExperienceItem
        org="Hills Road Sixth Form College"
        title="A-Levels"
        period="2011 - 2013"
        description="Maths (with Mechanics), History, Politics, Economics, AS Further Maths. Completed an extended project thesis on the criminal prosecution of children."
      />

      <ExperienceItem
        org="Comberton Village College"
        title="GCSEs"
        period="2006 - 2011"
        description="GCSEs in Maths, English Literature, English Language, Philosophy & Ethics, History, Chemistry, Biology, Physics, Spanish. AS Level History and Critical Thinking. FSMQ Maths."
      />
    </CollapsibleExperienceSection>
  );
}

export function SkillsAndLanguagesSection() {
  return (
    <CollapsibleExperienceSection title="Skills & Languages">
      <ExperienceSectionBody>
        <h3>Languages</h3>
        <ul>
          <li>English (Native)</li>
          <li>Spanish (Limited Working)</li>
          <li>Chinese (Elementary)</li>
        </ul>

        <h3>Programming Technologies</h3>
        <ul>
          <li>Python</li>
          <li>TypeScript & JavaScript (React / Next.js)</li>
          <li>Solidity</li>
        </ul>
      </ExperienceSectionBody>
    </CollapsibleExperienceSection>
  );
}

export function HonoursAndAwardsSection() {
  return (
    <CollapsibleExperienceSection title="Honours & Awards">
      <ExperienceSectionBody>
        <ul>
          <li>
            <a href="https://ethglobal.com/showcase/habeas-data-vgmcd" target="_blank" rel="noreferrer">
              First Prize - Octav Award
            </a>{" "}
            at ETHGlobal Buenos Aires (2025)
          </li>
          <li>Runner-Up in Durham University Trinity Novice Mooting Cup (2014)</li>
          <li>Duke of Edinburgh Gold Award (2014)</li>
          <li>United Kingdom Mathematics Trust Awards (2010, 2011)</li>
        </ul>
      </ExperienceSectionBody>
    </CollapsibleExperienceSection>
  );
}

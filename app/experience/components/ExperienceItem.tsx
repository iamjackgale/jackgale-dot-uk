import type { ReactNode } from "react";

export default function ExperienceItem({
  org,
  orgHref,
  title,
  period,
  description,
}: {
  org: string;
  orgHref?: string;
  title?: string;
  period: string;
  description?: ReactNode;
}) {
  return (
    <article className="experience-item">
      <header className="experience-item-header">
        <h3 className="experience-item-title">
          {orgHref ? (
            <a href={orgHref} target="_blank" rel="noreferrer">
              {org}
            </a>
          ) : (
            org
          )}
          {title ? <span className="experience-item-separator"> - {title}</span> : null}
        </h3>
        <p className="experience-item-period">{period}</p>
      </header>
      {description ? <div className="experience-item-description">{description}</div> : null}
    </article>
  );
}

import type { ReactNode } from "react";

export default function CollapsibleExperienceSection({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <details className="experience-card experience-collapsible" open>
      <summary className="experience-card-summary">
        <span className="experience-card-caret" aria-hidden="true">
          ▸
        </span>
        <h2>{title}</h2>
      </summary>
      <div className="experience-card-body">{children}</div>
    </details>
  );
}

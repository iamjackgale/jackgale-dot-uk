import React from "react";

export type ArticleLink = {
  href: string;
  title: string;
  date: string;
  category?: string;
  categories?: string[];
  tags?: string[];
  description: string;
  image: string;
};

function resolveArticleTags(article: Pick<ArticleLink, "tags" | "categories" | "category">): string[] {
  const normalizedTags = article.tags?.filter(Boolean) ?? [];
  if (normalizedTags.length > 0) {
    return normalizedTags;
  }

  const normalizedCategories = article.categories?.filter(Boolean) ?? [];
  if (normalizedCategories.length > 0) {
    return normalizedCategories;
  }

  return article.category ? [article.category] : ["ARTICLE"];
}

export default function Article({
  href,
  title,
  date,
  category,
  categories,
  tags,
  description,
  image,
}: ArticleLink) {
  const displayTags = resolveArticleTags({ tags, categories, category });
  // Check if it's an internal link (starts with /)
  const isInternal = href.startsWith('/');

  return (
    <a
      className="article-preview"
      href={href}
      target={isInternal ? '_self' : '_blank'}
      rel={isInternal ? undefined : 'noopener noreferrer'}
    >
      <div className="article-row">
        <div className="article-column text-col">
          <p className="article-header">{title}</p>
          <div className="article-meta">
            <span className="article-date">{date}</span>
            <div className="article-tags">
              {displayTags.map((tag, index) => (
                <span key={index} className="article-category">{tag}</span>
              ))}
            </div>
          </div>
          {/* Mobile image */}
          <div className="article-image-wrapper article-image-mobile mobile-only">
            <img className="article-image" src={image} alt={title} />
          </div>
          <div className="article-description-box">
            <p className="article-description">{description}</p>
          </div>
        </div>
        {/* Desktop image */}
        <div className="article-column image-col desktop-only">
          <div className="article-image-wrapper article-image-desktop">
            <img className="article-image" src={image} alt={title} />
          </div>
        </div>
      </div>
    </a>
  );
}

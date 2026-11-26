import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailView } from "@/components/guide/article-detail-view";
import {
  getAllGuideArticles,
  getGuideArticleBySlug,
  getRelatedGuideArticles,
} from "@/data/travel-guide-articles";
import { alternatesFor } from "@/lib/page-metadata";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Hanoi Discovery",
    };
  }

  return {
    title: `${article.titleEn} | Hanoi Discovery Travel Guide`,
    description: article.descriptionEn,
    alternates: alternatesFor("en", `/guide/${slug}`),
    openGraph: {
      title: article.titleEn,
      description: article.descriptionEn,
      images: [
        {
          url: article.coverImage,
          alt: article.coverImageAltEn,
          width: 1200,
          height: 675,
        },
      ],
      type: "article",
      publishedTime: article.publishedAtIso,
      authors: [article.authorEn],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleEn,
      description: article.descriptionEn,
      images: [article.coverImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getGuideArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedGuideArticles(slug, 3);

  // Schema.org Structured Data
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titleEn,
    description: article.descriptionEn,
    image: article.coverImage,
    datePublished: article.publishedAtIso,
    dateModified: article.publishedAtIso,
    author: {
      "@type": "Person",
      name: article.authorEn,
    },
    publisher: {
      "@type": "Organization",
      name: "Hanoi Discovery",
      url: "https://hanoidiscovery.vn",
      logo: {
        "@type": "ImageObject",
        url: "https://hanoidiscovery.vn/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hanoidiscovery.vn/en/guide/${slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://hanoidiscovery.vn/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travel Guide",
        item: "https://hanoidiscovery.vn/en/guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.titleEn,
        item: `https://hanoidiscovery.vn/en/guide/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ArticleDetailView article={article} relatedArticles={relatedArticles} locale="en" />
    </>
  );
}

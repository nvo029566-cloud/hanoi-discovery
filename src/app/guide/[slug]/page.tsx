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
      title: "Không tìm thấy bài viết | Hanoi Discovery",
    };
  }

  return {
    title: `${article.titleVi} | Cẩm nang Hanoi Discovery`,
    description: article.descriptionVi,
    alternates: alternatesFor("vi", `/guide/${slug}`),
    openGraph: {
      title: article.titleVi,
      description: article.descriptionVi,
      images: [
        {
          url: article.coverImage,
          alt: article.coverImageAltVi,
          width: 1200,
          height: 675,
        },
      ],
      type: "article",
      publishedTime: article.publishedAtIso,
      authors: [article.authorVi],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleVi,
      description: article.descriptionVi,
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
    headline: article.titleVi,
    description: article.descriptionVi,
    image: article.coverImage,
    datePublished: article.publishedAtIso,
    dateModified: article.publishedAtIso,
    author: {
      "@type": "Person",
      name: article.authorVi,
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
      "@id": `https://hanoidiscovery.vn/guide/${slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://hanoidiscovery.vn",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cẩm nang",
        item: "https://hanoidiscovery.vn/guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.titleVi,
        item: `https://hanoidiscovery.vn/guide/${slug}`,
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
      <ArticleDetailView article={article} relatedArticles={relatedArticles} locale="vi" />
    </>
  );
}

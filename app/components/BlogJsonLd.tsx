import { siteInfo } from '@/constants/info';
import Script from 'next/script';
import type { MarkdownData } from '../markdown-fetch';

export const BlogJsonLd = ({ post }: { post: MarkdownData }) => {
  const logoImageObject = {
    "@type": "ImageObject",
    url: siteInfo.organizationLogo,
    width: 512,
    height: 512,
  }

  const jsonld = [
    // 会社情報
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CA技研",
      url: "https://ca-giken.com",
      logo: logoImageObject,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
        },
      ],
    },
    // ウェブサイト情報
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteInfo.title,
      url: siteInfo.url,
    },
    // 投稿情報
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: [post.image], // TODO: OG IMAGE
      datePublished: post.created_at,
      dateModified: post.last_updated,
      keywords: post.tags,
      publisher: {
        "@type": "Organization",
        name: "CA技研",
        logo: logoImageObject,
      }
    },
    // パンくずリスト
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      name: "パンくずリスト",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteInfo.title,
          item: siteInfo.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: siteInfo.blogPage.title,
          item: siteInfo.blogPage.url,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${siteInfo.blogPage.url}/${post.slug}`,
        }
      ]
    }
  ]

  return (
    <>
      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
    </>
  )
}
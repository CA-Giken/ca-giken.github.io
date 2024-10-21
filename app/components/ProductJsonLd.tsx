import { siteInfo } from '@/constants/info';
import Script from 'next/script';
import type { MarkdownData } from '../markdown-fetch';

export const ProductJsonLd = ({ post }: { post: MarkdownData }) => {
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
      name: siteInfo.title,
      url: siteInfo.url,
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
    // 製品情報
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: post.title,
      image: post.image,
      description: post.description,
      brand: {
        "@type": "Organization",
        name: "CA技研",
        logo: logoImageObject,
      },
      countryOfOrigin: "JP",
      countryOfAssembly: "JP",
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
          name: siteInfo.productPage.title,
          item: siteInfo.productPage.url,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${siteInfo.productPage.url}/${post.slug}`,
        }
      ]
    }
  ]

  return (
    <>
      <Script
        type="application/ld+json"
        strategy='beforeInteractive'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
    </>
  )
}
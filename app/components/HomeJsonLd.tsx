import { siteInfo } from '@/constants/info';
import Script from 'next/script';

export const HomeJsonLd = () => {
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
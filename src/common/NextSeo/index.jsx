import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

function NextSEO({ seo }) {
  return (
    <>
      <NextSeo
        title={seo?.Title}
        description={seo?.Description}
        canonical={seo?.url}
        openGraph={{
          url: `${seo?.url}`,
          title: `${seo?.Title}`,
          description: `${seo?.Description}`,
          images: [
            {
              url: `${seo?.OG_Img}`,
              alt: `${seo?.OG_Img_alt_tag}`,
              width: 1024,
              height: 768,
            },
          ],
          siteName: "WriterTools",
        }}
        twitter={{
          handle: "@WriterTools",
          site: "@WriterTools",
          cardType: "summary_large_image  ",
        }}
      />
      <Head>
        <meta name="keywords" content={seo?.KeyWords} />
        <meta property="og:image:secure_url" content={seo?.OG_Img} />
        <meta name="twitter:url" href={seo?.url} />
        <meta name="twitter:title" content={seo?.Title} />
        <meta name="twitter:description" content={seo?.Description} />
        <meta name="twitter:image" content={seo?.OG_Img} />
        <meta name="twitter:image:alt" content={seo?.Title} />
        {seo?.PageViewSchema && (
          <script
            id="PageViewSchema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo?.PageViewSchema),
            }}
          />
        )}
      </Head>
    </>
  );
}

export default NextSEO; 

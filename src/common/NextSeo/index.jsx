import React from "react";
import Head from "next/head";

function NextSEO({ seo }) {
  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{seo?.Title || "WriterTools"}</title>
        <meta name="description" content={seo?.Description || ""} />
        <link rel="canonical" href={seo?.url || ""} />

        {/* Open Graph / Facebook */}
        <meta property="og:url" content={seo?.url || ""} />
        <meta property="og:title" content={seo?.Title || ""} />
        <meta property="og:description" content={seo?.Description || ""} />
        <meta property="og:image" content={seo?.OG_Img || ""} />
        <meta property="og:image:alt" content={seo?.OG_Img_alt_tag || ""} />
        <meta property="og:site_name" content="WriterTools" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="768" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@WriterTools" />
        <meta name="twitter:creator" content="@WriterTools" />
        <meta name="twitter:url" content={seo?.url || ""} />
        <meta name="twitter:title" content={seo?.Title || "WriterTools"} />
        <meta name="twitter:description" content={seo?.Description || ""} />
        <meta name="twitter:image" content={seo?.OG_Img || ""} />
        <meta name="twitter:image:alt" content={seo?.OG_Img_alt_tag || "Image Alt"} />

        {/* Additional Meta */}
        <meta name="keywords" content={seo?.KeyWords || ""} />
        <meta property="og:image:secure_url" content={seo?.OG_Img || ""} />

        {/* Structured Data Schema */}
        {seo?.PageViewSchema && (
          <script
            id="PageViewSchema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seo?.PageViewSchema) }}
          />
        )}
      </Head>
    </>
  );
}

export default NextSEO;

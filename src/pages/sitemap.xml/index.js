import { getServerSideSitemap } from "next-sitemap";

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

function generateUrls(data, ctx, url = "") {
  const dat = data.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/${item?.route}`,
    lastmod: new Date(item?.updatedAt).toISOString(),
    changefreq: "daily",
    // priority: item.attributes.slug === "terms-condition" || item.attributes.slug === "privacy-policy" ? 0.7 : 1,
    priority: 1,
  }));

  return dat;
}

async function generateStaticSitemap(ctx) {
  const finalRoutes = [
    {
      route: "",
      updatedAt: new Date().toISOString(),
      show_in_sitemap: true,
    },
    {
      route: "disclaimer",
      updatedAt: new Date().toISOString(),
      show_in_sitemap: true,
    },
    {
      route: "privacy-policy",
      updatedAt: new Date().toISOString(),
      show_in_sitemap: true,
    },
    {
      route: "terms-and-conditions",
      updatedAt: new Date().toISOString(),
      show_in_sitemap: true,
    },
  ];

  return getServerSideSitemap(ctx, generateUrls(finalRoutes, ctx));
}

export async function getServerSideProps(ctx) {
  return await generateStaticSitemap(ctx);
}

export default function Site() {}

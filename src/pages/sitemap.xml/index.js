import { getServerSideSitemap } from "next-sitemap";
const { BaseURL } = require("@/helpers/API/ApiData");
const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

function generateUrls(data, ctx, url = "") {
  const dat = data.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/${item?.route}`,
    changefreq: "daily",
    priority: 1,
  }));

  return dat;
}
export async function fetchBlogs() {
  let response = await fetch(`${BaseURL}blog-services/blogs/get?isActive=true&limit=2000`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  return data?.payload?.blogs;
}
function generateMonthWiseDate(data, ctx, url = "") {
  const generateMonthArray = data.map((item) => {
    const createdAt = new Date(item?.createdAt);
    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;
    return {
      route: `sitemap-${formattedDate}.xml`,
    };
  });

  const uniqueItems = generateMonthArray.reduce((acc, current) => {
    const x = acc.find((item) => item?.route === current?.route);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, []);

  return uniqueItems;
}
async function generateStaticSitemap(ctx) {
  const blogData = await fetchBlogs();
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
  const blogRoutes = generateMonthWiseDate(blogData, ctx);

  return getServerSideSitemap(ctx, generateUrls([...finalRoutes, ...blogRoutes], ctx));
}

export async function getServerSideProps(ctx) {
  return await generateStaticSitemap(ctx);
}

export default function Site() {}

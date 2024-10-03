import { getServerSideSitemap } from "next-sitemap";
const { BaseURL } = require("@/helpers/API/ApiData");

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

async function fetchBlogs() {
  let response = await fetch(`${BaseURL}blog-services/blogs/get?isActive=true&limit=2000`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  return data?.payload?.blogs;
}
async function fetchCategory() {
  let response = await fetch(`${BaseURL}blog-services/blog-categories/get?isActive=true&skip=1&limit=100`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  return data?.payload?.blog_category;
}

async function generateBlogSitemap(ctx) {
  const blogData = await fetchBlogs();
  const chunks = chunkArray(blogData, TOOLS_PER_SITEMAP);
  // Fetch other data similarly...
  const sitemapPromises = chunks.map(async (chunk, index) => {
    const filename = `blogs-${index + 1}.xml`;
    return filename;
  });

  const sitemapFiles = await Promise.all(sitemapPromises);

  return getServerSideSitemap(ctx, generateUrls(sitemapFiles));
}

export async function generateBlogsChunksSitemap(ctx) {
  const blogData = await fetchBlogs();

  const dateParts = ctx.req.url.match(/\/sitemap-(\d{4})-(\d{2})\.xml/);
  const year = dateParts ? dateParts[1] : null;
  const month = dateParts ? dateParts[2] : null;

  if (!year || !month) {
    console.error("Invalid date format");
    return;
  }

  const filteredBlogs = blogData.filter((blog) => {
    const blogDate = new Date(blog.createdAt);
    const blogYear = blogDate.getFullYear();
    const blogMonth = String(blogDate.getMonth() + 1).padStart(2, "0"); // Add leading zero for single digit months

    return blogYear === parseInt(year) && blogMonth === month;
  });

  // Generate sitemap URLs based on filtered blogs
  return getServerSideSitemap(ctx, generateBlogsChunksUrls(filteredBlogs));
}

async function generateCategoryChunksSitemap(ctx) {
  const categoryData = await fetchCategory();
  const digit = ctx.req.url.match(/category-(\d+)\.xml/)[1];

  const chunks = chunkArray(categoryData, TOOLS_PER_SITEMAP);

  return getServerSideSitemap(ctx, generateCategoryChunksUrls(chunks[digit - 1]));
}

export async function generateSitemapCategoryChunksSitemap(ctx) {
  const categoryData = await fetchCategory();
  return getServerSideSitemap(ctx, generateCategoryChunksUrls(categoryData));
}

const TOOLS_PER_SITEMAP = 100;

function generateUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/sitemap/${item}`,
    lastmod: new Date().toISOString(),
  }));

  return dat;
}

function generateBlogsChunksUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/${item?.slugId}`,
    lastmod: new Date(item?.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 1,
  }));

  return dat;
}

function generateCategoryChunksUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/category/${item?.slugId}`,
    lastmod: new Date(item?.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 1,
  }));
  return dat;
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array?.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function getServerSideProps(ctx) {

  const blogData = await fetchBlogs();

  const blogsChunks = chunkArray(blogData, TOOLS_PER_SITEMAP);

  // switch (true) {
  //   case ctx?.req?.url?.includes("blog.xml"):
  //     return await generateBlogSitemap(ctx);

  //   case ctx?.req?.url.includes("/sitemap/sitemap-category.xml"):
  //     return await generateSitemapCategoryChunksSitemap(ctx);


  //   case ctx?.req?.url?.includes("blogs-") && ctx?.req?.url?.match(/blogs-(\d+)\.xml/)[1] <= blogsChunks?.length:
  //     return await generateBlogsChunksSitemap(ctx);

  //   case ctx?.req?.url.includes("category-") && ctx?.req?.url?.match(/category-(\d+)\.xml/)[1] <= blogsChunks?.length:
  //     return await generateCategoryChunksSitemap(ctx);

  //   default:
  //     ctx.res.setHeader("Location", "/");
  //     ctx.res.statusCode = 302;
  //     ctx.res.end();
  //     return { props: {} };
  // }
}

export default function Site() {}

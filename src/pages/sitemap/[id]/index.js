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
async function generateCategorySitemap(ctx) {
  const categoryData = await fetchCategory();
  const chunks = chunkArray(categoryData, TOOLS_PER_SITEMAP);
  // Fetch other data similarly...
  const sitemapPromises = chunks.map(async (chunk, index) => {
    const filename = `category-${index + 1}.xml`;
    return filename;
  });

  const sitemapFiles = await Promise.all(sitemapPromises);

  return getServerSideSitemap(ctx, generateUrls(sitemapFiles));
}

async function generateBlogsChunksSitemap(ctx) {
  const blogData = await fetchBlogs();
  const digit = ctx.req.url.match(/blogs-(\d+)\.xml/)[1];

  const chunks = chunkArray(blogData, TOOLS_PER_SITEMAP);

  return getServerSideSitemap(ctx, generateBlogsChunksUrls(chunks[digit - 1]));
}
async function generateCategoryChunksSitemap(ctx) {
  const categoryData = await fetchCategory();
  const digit = ctx.req.url.match(/category-(\d+)\.xml/)[1];

  const chunks = chunkArray(categoryData, TOOLS_PER_SITEMAP);

  return getServerSideSitemap(ctx,generateCategoryChunksUrls(chunks[digit - 1]));
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
    loc: `${EXTERNAL_DATA_URL}/blog/${item?.slugId}`,
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
  console.log(`ctx.req.url`,ctx.req.url)
  const blogData = await fetchBlogs();

  const blogsChunks = chunkArray(blogData, TOOLS_PER_SITEMAP);

  switch (true) {
    case ctx?.req?.url?.includes("blog.xml"):
      return await generateBlogSitemap(ctx);

    case ctx?.req?.url?.includes("category.xml"):
      return await generateCategorySitemap(ctx);

    case ctx?.req?.url?.includes("blogs-") && ctx?.req?.url?.match(/blogs-(\d+)\.xml/)[1] <= blogsChunks?.length:
      return await generateBlogsChunksSitemap(ctx);
    
    case ctx?.req?.url.includes("category-") && ctx?.req?.url?.match(/category-(\d+)\.xml/)[1] <= blogsChunks?.length:
      return await generateCategoryChunksSitemap(ctx);

    default:
      ctx.res.setHeader("Location", "/");
      ctx.res.statusCode = 302;
      ctx.res.end();
      return { props: {} };
  }
}

export default function Site() {}

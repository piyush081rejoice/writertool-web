const fs = require("fs");
const path = require("path");

const { BaseURL } = require("@/helpers/API/ApiData");

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

async function fetchBlogs() {
  let response = await fetch(`${BaseURL}blog-services/blogs/get?isActive=true&limit=2000`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  return data?.data?.payload?.blogs;
}

function generateUrls(data, url = "") {
  return data
    .map(
      (item) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/${url}/${item?.slugId}`}</loc>
        <lastmod>${new Date(item?.updatedAt)?.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
    .join("");
}

async function generateBlogSitemap() {
  const blogData = await fetchBlogs();
  // Fetch other data similarly...
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateUrls(blogData, "blog")}
    </urlset>`;

  fs.writeFileSync(path.join(__dirname, "../public", "blog-sitemap.xml"), sitemapContent);
}

function generateSitemap() {
  generateBlogSitemap();
}

generateSitemap();

import NextSEO from "@/common/NextSeo";
import { ApiGet, ApiGetNoAuth } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL, LOGO_URL } from "@/helpers/Constant";
import BlogInside from "@/module/blogInside";
import { generateBlogsChunksSitemap, generateSitemapCategoryChunksSitemap } from "./sitemap/[id]";
import moment from "moment";

const UpdateBlog = ({ getSingleBlogData, isTrendingBlogsData, seoData, PageViewSchema }) => {
  return (
    <>
      <NextSEO seo={seoData} PageViewSchema={PageViewSchema} />
      <div>
        <BlogInside singleBlog={getSingleBlogData} isTrendingBlogsData={isTrendingBlogsData} />
      </div>
    </>
  );
};

export default UpdateBlog;

export async function getServerSideProps(context) {
  const { slugId } = context?.params;
  if (context.req.url.includes("/sitemap")) {
    if (context.req.url === "/sitemap-category.xml") {
      return await generateSitemapCategoryChunksSitemap(context);
    } else {
      return await generateBlogsChunksSitemap(context);
    }
  } else {
    try {
      const singleBlogData = await ApiGet(`blog-services/blogs/get?slugId=${slugId}`).then((resp) => resp?.data?.payload);
      const isTrendingBlogsData = await ApiGetNoAuth("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
      const PageViewSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${EXTERNAL_DATA_URL}/${singleBlogData?.blogs?.slugId}`,
        },
        headline: `${singleBlogData?.blogs?.metaTitle}`,
        description: `${singleBlogData?.blogs?.metaDescription}`,
        image: `${singleBlogData?.blogs?.coverPhoto}`,
        author: {
          "@type": "Person",
          name: "Writer tool",
        },
        publisher: {
          "@type": "Organization",
          name: "Writer tool",
          logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
          },
        },
        datePublished: moment(singleBlogData?.blogs?.createdAt)?.format("YYYY-MM-DD"),
      };
      const seoData = {
        Title: `${singleBlogData?.blogs?.metaTitle} | WriterTools`,
        Description: singleBlogData?.blogs?.metaDescription || "Read this insightful blog post on WriterTools.",
        OG_Img: singleBlogData?.blogs?.coverPhoto,
        url: `${EXTERNAL_DATA_URL}/${singleBlogData?.blogs?.slugId}`,
        OG_Img_alt_tag: singleBlogData?.coverPhotoAltTag ? singleBlogData?.coverPhotoAltTag : "image",
        KeyWords: singleBlogData?.blogs?.keyWords?.join(", ") || "",
      };
      return {
        props: {
          getSingleBlogData: singleBlogData?.blogs,
          isTrendingBlogsData: isTrendingBlogsData || [],
          seoData: seoData || null,
          PageViewSchema,
        },
      };
    } catch (error) {
      if (!error?.response?.data?.success) {
        return {
          redirect: {
            destination: `/`,
            permanent: false,
          },
        };
      } else {
        return {
          props: {
            error: "faceing error",
          },
        };
      }
    }
  }
}

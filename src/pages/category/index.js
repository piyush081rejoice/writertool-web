import { ApiGet } from "@/helpers/API/ApiData";
import dynamic from "next/dynamic";
const Category = dynamic(() => import("@/module/category"));
const NextSEO = dynamic(() => import("@/common/NextSeo"));

export default function index({ getBlogCategoryData, isTrendingBlogsData ,seoData }) {
  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <Category {...{ getBlogCategoryData, isTrendingBlogsData }} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    const isTrendingBlogsData = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
    const seoData = {
      Title: `Category | WriterTools`,
      Description: `Explore insightful blogs category on WriterTools.`,
    };
    return {
      props: {
        getBlogCategoryData: blogCategoryData?.blog_category,
        isTrendingBlogsData: isTrendingBlogsData || [],
        seoData: seoData || null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "faceing error",
      },
    };
  }
}

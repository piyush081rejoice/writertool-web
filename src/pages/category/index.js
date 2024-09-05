import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import Category from "@/module/category";

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
      Title: `WriterTools Categories | Explore Diverse Writing Resources`,
      Description: `Browse various tools and resources tailored to enhance different aspects of your writing process.`,
      url:`${EXTERNAL_DATA_URL}/category`
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

import { formatTitleCase } from "@/common";
import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import Category from "@/module/category";
import { useRouter } from "next/router";

const UpdateBlog = ({ getBlogCategoryData, isTrendingBlogsData ,seoData }) => {
  const router = useRouter();
  const { slugId } = router.query;

  return (
    <>
    <NextSEO seo={seoData} />
    <div>
      <Category {...{ getBlogCategoryData, slugId, isTrendingBlogsData }} />
    </div>
    </>
  );
};

export default UpdateBlog;

export async function getServerSideProps(context) {
  const { slugId } = context?.params;
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    const isTrendingBlogsData = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
    
    const seoData = {
      Title: `${formatTitleCase(slugId)} Category | WriterTools`,
      Description: `Explore insightful blogs in the ${slugId} category on WriterTools.`,
      url:`${EXTERNAL_DATA_URL}/category/${slugId}`
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

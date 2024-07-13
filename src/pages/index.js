import { ApiGet, ApiGetNoAuth } from "@/helpers/API/ApiData";
import HomePage from "@/module/homepage";

export default function Home({ getBlogCategoryData, getBlogsData, getTrendingBlogData }) {
  return (
    <>
      <HomePage {...{ getBlogCategoryData, getBlogsData, getTrendingBlogData }} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    const blogsData = await ApiGetNoAuth("blog-services/blogs/get?isActive=true").then((resp) => resp?.data?.payload);
    const trendingBlogData = await ApiGet(`blog-services/blogs/get?isTrending=true&skip=1&limit=3`).then((resp) => resp?.data?.payload);

    return {
      props: {
        getBlogsData: blogsData?.blogs || [],
        getBlogCategoryData: blogCategoryData?.blog_category || [],
        getTrendingBlogData: trendingBlogData?.blogs || [],
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

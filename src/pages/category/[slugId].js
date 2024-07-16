import { ApiGet } from "@/helpers/API/ApiData";
import Category from "@/module/category";
import { useRouter } from "next/router";

const UpdateBlog = ({getBlogCategoryData,isTrendingBlogsData }) => {
  const router = useRouter();
  const { slugId } = router.query;

  return (
    <div>
      <Category {...{ getBlogCategoryData ,slugId,isTrendingBlogsData }} />
    </div>
  );
};

export default UpdateBlog;

export async function getServerSideProps() {
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    const isTrendingBlogsData = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
    return {
      props: {
        getBlogCategoryData: blogCategoryData?.blog_category,
        isTrendingBlogsData: isTrendingBlogsData || [],
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

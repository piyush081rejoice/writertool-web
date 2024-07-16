import { ApiGet } from "@/helpers/API/ApiData";
import BlogInside from "@/module/blogInside";
import { useRouter } from "next/router";

const UpdateBlog = ({ getSingleBlogData ,isTrendingBlogsData }) => {
  const router = useRouter();
  const { slugId } = router.query;

  return (
    <div>
      <BlogInside slugId={slugId} singleBlog={getSingleBlogData} isTrendingBlogsData={isTrendingBlogsData} />
    </div>
  );
};

export default UpdateBlog;

export async function getServerSideProps(context) {
  const { slugId } = context.params;
  

  try {
    const singleBlogData = await ApiGet(`blog-services/blogs/get?slugId=${slugId}`).then((resp) => resp?.data?.payload);
    const isTrendingBlogsData = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
  
    return {
      props: {
        getSingleBlogData: singleBlogData?.blogs,
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

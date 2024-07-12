import { ApiGet } from "@/helpers/API/ApiData";
import WriteBlog from "@/module/writeBlog";
import { useRouter } from "next/router";

const UpdateBlog = ({ getBlogCategoryData, updateBlogData }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <WriteBlog getBlogCategoryData={getBlogCategoryData} updateId={id} updateBlogData={updateBlogData} />
    </div>
  );
};

export default UpdateBlog;

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    const updateBlogData = await ApiGet(`blog-services/blogs/get?id=${id}`).then((resp) => resp?.data?.payload?.blog_category);

    return {
      props: {
        getBlogCategoryData: blogCategoryData?.blog_category,
        updateBlogData: updateBlogData,
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

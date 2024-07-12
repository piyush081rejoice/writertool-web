import { ApiGet } from "@/helpers/API/ApiData";
import Category from "@/module/category";
import { useRouter } from "next/router";

const UpdateBlog = ({getBlogCategoryData }) => {
  const router = useRouter();
  const { slugId } = router.query;

  return (
    <div>
      <Category {...{ getBlogCategoryData ,slugId }} />
    </div>
  );
};

export default UpdateBlog;

export async function getServerSideProps() {
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    return {
      props: {
        getBlogCategoryData: blogCategoryData?.blog_category,
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

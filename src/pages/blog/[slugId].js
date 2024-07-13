import { ApiGet } from "@/helpers/API/ApiData";
import BlogInside from "@/module/blogInside";
import { useRouter } from "next/router";

const UpdateBlog = ({ getSingleBlogData }) => {
  const router = useRouter();
  const { slugId } = router.query;

  return (
    <div>
      <BlogInside slugId={slugId} singleBlog={getSingleBlogData} />
    </div>
  );
};

export default UpdateBlog;

export async function getServerSideProps(context) {
  const { slugId } = context.params;
  

  try {
    const singleBlogData = await ApiGet(`blog-services/blogs/get?slugId=${slugId}`).then((resp) => resp?.data?.payload);
  
    return {
      props: {
        getSingleBlogData: singleBlogData?.blogs,
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

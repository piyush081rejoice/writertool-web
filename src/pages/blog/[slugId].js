import { ApiGet } from "@/helpers/API/ApiData";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const BlogInside = dynamic(() => import("@/module/blogInside"));
const NextSEO = dynamic(() => import("@/common/NextSeo"));
const UpdateBlog = ({ getSingleBlogData, isTrendingBlogsData, seoData }) => {
  const router = useRouter();
  const { slugId } = router.query;

  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <BlogInside slugId={slugId} singleBlog={getSingleBlogData} isTrendingBlogsData={isTrendingBlogsData} />
      </div>
    </>
  );
};

export default UpdateBlog;

export async function getServerSideProps(context) {
  const { slugId } = context.params;

  try {
    const singleBlogData = await ApiGet(`blog-services/blogs/get?slugId=${slugId}`).then((resp) => resp?.data?.payload);
    const isTrendingBlogsData = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
    const seoData = {
      Title: `${singleBlogData?.title} | WriterTools`,
      Description: singleBlogData?.sortDescription || "Read this insightful blog post on WriterTools.",
    };
    return {
      props: {
        getSingleBlogData: singleBlogData?.blogs,
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

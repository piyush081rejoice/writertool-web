import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import BlogInside from "@/module/blogInside";
import { useRouter } from "next/router";

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
  const { slugId } = context?.params;
  try {
    const singleBlogData = await ApiGet(`blog-services/blogs/get?slugId=${slugId}`).then((resp) => resp?.data?.payload);
    const isTrendingBlogsData = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
    console.log("🚀 ~ file: [slugId].js:28 ~ getServerSideProps ~ singleBlogData:", singleBlogData?.blogs?.keyWords)
    const seoData = {
      Title: `${singleBlogData?.blogs?.metaTitle} | WriterTools`,
      Description: singleBlogData?.blogs?.metaDescription || "Read this insightful blog post on WriterTools.",
      OG_Img: singleBlogData?.blogs?.coverPhoto,
      url: `${EXTERNAL_DATA_URL}/${singleBlogData?.blogs?.slugId}`,
      OG_Img_alt_tag: singleBlogData?.coverPhotoAltTag ? singleBlogData?.coverPhotoAltTag : "image",
      KeyWords:singleBlogData?.blogs?.keyWords?.join(", ") || ""
    };
    return {
      props: {
        getSingleBlogData: singleBlogData?.blogs,
        isTrendingBlogsData: isTrendingBlogsData || [],
        seoData: seoData || null,
      },
    };
  } catch (error) {
    if (!error?.response?.data?.success) {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          error: "faceing error",
        },
      };
    }
  }
}

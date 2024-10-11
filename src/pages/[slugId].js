import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import BlogInside from "@/module/blogInside";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const router = useRouter();
  const { slugId } = router.query;

  const [singleBlogData, setSingleBlogData] = useState(null);
  const [isTrendingBlogsData, setIsTrendingBlogsData] = useState([]);
  const [seoData, setSeoData] = useState({
    Title: "",
    Description: "",
    OG_Img: "",
    url: "",
    OG_Img_alt_tag: "",
    KeyWords: "",
  });

  useEffect(() => {
    if (!slugId) return;

    const fetchData = async () => {
      try {
        // Fetch single blog data
        const singleBlogResponse = await ApiGet(`blog-services/blogs/get?slugId=${slugId}`);
        const singleBlogData = singleBlogResponse?.data?.payload?.blogs;

        // Fetch trending blogs
        const trendingBlogsResponse = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3");
        const trendingBlogsData = trendingBlogsResponse?.data?.payload?.blogs;

        // Update SEO metadata
        setSeoData({
          Title: `${singleBlogData?.metaTitle} | WriterTools`,
          Description: singleBlogData?.metaDescription || "Read this insightful blog post on WriterTools.",
          OG_Img: singleBlogData?.coverPhoto,
          url: `${EXTERNAL_DATA_URL}/${singleBlogData?.slugId}`,
          OG_Img_alt_tag: singleBlogData?.coverPhotoAltTag || "image",
          KeyWords: singleBlogData?.keyWords?.join(", ") || "",
        });

        setSingleBlogData(singleBlogData);
        setIsTrendingBlogsData(trendingBlogsData || []);
      } catch (error) {
        toast.error("Error fetching data");
        if (error?.response?.data?.success === false) {
          router.push("/");
        }
      }
    };

    fetchData();
  }, [slugId]);

  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <BlogInside singleBlog={singleBlogData} isTrendingBlogsData={isTrendingBlogsData} />
      </div>
    </>
  );
};

export default UpdateBlog;

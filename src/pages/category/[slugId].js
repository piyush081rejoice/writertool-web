import { formatTitleCase } from "@/common";
import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import Category from "@/module/category";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const router = useRouter();
  const { slugId } = router.query;

  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [isTrendingBlogsData, setIsTrendingBlogsData] = useState([]);
  const [seoData, setSeoData] = useState({
    Title: "",
    Description: "",
    url: "",
  });

  useEffect(() => {
    if (!slugId) return; // Wait for slugId from the URL

    const fetchData = async () => {
      try {
        // Fetch Blog Categories
        const blogCategoryDataResponse = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50");
        setBlogCategoryData(blogCategoryDataResponse?.data?.payload?.blog_category || []);

        // Fetch Trending Blogs
        const trendingBlogsResponse = await ApiGet("blog-services/blogs/get?isTrending=true&skip=1&limit=3");
        setIsTrendingBlogsData(trendingBlogsResponse?.data?.payload?.blogs || []);

        // Update SEO Data
        setSeoData({
          Title: `${formatTitleCase(slugId)} Category | WriterTools`,
          Description: `Explore insightful blogs in the ${slugId} category on WriterTools.`,
          url: `${EXTERNAL_DATA_URL}/category/${slugId}`,
        });
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [slugId]); // Re-run when slugId changes

  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <Category {...{ getBlogCategoryData: blogCategoryData, slugId, isTrendingBlogsData }} />
      </div>
    </>
  );
};

export default UpdateBlog;

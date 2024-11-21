import NextSEO from "@/common/NextSeo";
import { ApiGet, ApiGetNoAuth } from "@/helpers/API/ApiData";
import { CATEGORY_PAGE_URL, EXTERNAL_DATA_URL } from "@/helpers/Constant";
import Category from "@/module/category";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Index() {
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [isTrendingBlogsData, setIsTrendingBlogsData] = useState([]);
  const seoData = {
    Title: "WriterTools Categories | Explore Diverse Writing Resources",
    Description: "Browse various tools and resources tailored to enhance different aspects of your writing process.",
    url: `${EXTERNAL_DATA_URL}/category`,
    KeyWords: "Categories,Diverse Writing Resources",
    OG_Img: CATEGORY_PAGE_URL,
    OG_Img_alt_tag: "Categories",
  };

  useEffect(() => {
    // Fetch blog category data and trending blog data after the component mounts
    const fetchData = async () => {
      try {
        // Fetch Blog Categories
        const blogCategoryDataResponse = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50");
        setBlogCategoryData(blogCategoryDataResponse?.data?.payload?.blog_category || []);

        // Fetch Trending Blogs
        const trendingBlogsResponse = await ApiGetNoAuth("blog-services/blogs/get?isTrending=true&skip=1&limit=3");
        setIsTrendingBlogsData(trendingBlogsResponse?.data?.payload?.blogs || []);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <Category {...{ getBlogCategoryData: blogCategoryData, isTrendingBlogsData }} />
      </div>
    </>
  );
}

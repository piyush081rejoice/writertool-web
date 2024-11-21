import NextSEO from "@/common/NextSeo";
import { ApiGet, ApiGetNoAuth, BaseURL, getHttpOptions } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL, HOME_PAGE_URL } from "@/helpers/Constant";
import { getCookie } from "@/hooks/useCookie";
import HomePage from "@/module/homepage";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Server-side function to fetch SEO data
export const getServerSideProps = async () => {
  try {
    // Fetch SEO Data
    const seoResponse = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=home`);
    const homePageSeoData = seoResponse?.data?.payload?.privacy_policy[0] || {};

    const seoData = {
      Title: homePageSeoData.metaTitle || "",
      Description: homePageSeoData.metaDescription || "",
      KeyWords: homePageSeoData.metaKeyWords?.join(", ") || "",
      url: `${EXTERNAL_DATA_URL}`,
      OG_Img_alt_tag: "Home Page",
      OG_Img: HOME_PAGE_URL,
    };

    return { props: { seoData } };
  } catch (error) {
    return { props: { seoData: {} } };
  }
};

export default function Home({ seoData }) {
  const [blogDataLoading, setBlogDataLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [trendingBlogData, setTrendingBlogData] = useState([]);
  const [blogsTotalCount, setBlogsTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const userToken = getCookie("userToken");

  useEffect(() => {
    fetchBlogData();
  }, [limit]);

  const fetchBlogData = async () => {
    setBlogDataLoading(true);
    try {
      const headers = userToken ? { "x-auth-token": `${userToken}` } : {};

      // Fetch Blog Category Data
      const blogCategoryDataResponse = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=10");
      setBlogCategoryData(blogCategoryDataResponse?.data?.payload?.blog_category || []);

      // Fetch Blogs Data
      const blogsResponse = userToken
        ? await axios.get(`${BaseURL}blog-services/blogs/get-editor-blogs?isActive=true&limit=${limit}`, { ...getHttpOptions(), headers })
        : await ApiGet(`blog-services/blogs/get?isActive=true&limit=${limit}`);

      const blogsPayload = userToken ? blogsResponse?.data?.payload?.editor_blogs : blogsResponse?.data?.payload?.blogs;
      setBlogData(blogsPayload || []);
      setBlogsTotalCount(blogsResponse?.data?.payload?.counts || 0);

      // Fetch Trending Blog Data
      const trendingBlogResponse = await ApiGetNoAuth(`blog-services/blogs/get?isTrending=true&skip=1&limit=3`);
      setTrendingBlogData(trendingBlogResponse?.data?.payload?.blogs || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setBlogDataLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (blogData.length < blogsTotalCount) {
      setLimit((prevLimit) => prevLimit + 5);
    }
  };

  useEffect(() => {
    const eventNames = ["logout", "onBoardingComplete"];
    const handleMultipleEvents = () => {
      fetchBlogData();
    };

    eventNames.forEach((event) => {
      window.addEventListener(event, handleMultipleEvents);
    });

    return () => {
      eventNames.forEach((event) => {
        window.removeEventListener(event, handleMultipleEvents);
      });
    };
  }, []);

  return (
    <>
      <NextSEO seo={seoData} />
      <HomePage
        handleGetBlogsData={fetchBlogData}
        onLoadMore={handleLoadMore}
        isLoadMoreDisabled={blogData?.length >= blogsTotalCount}
        blogDataLoading={blogDataLoading}
        getBlogsData={blogData}
        getBlogCategoryData={blogCategoryData}
        getTrendingBlogData={trendingBlogData}
      />
    </>
  );
}

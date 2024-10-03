import { ApiGet, BaseURL, getHttpOptions } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import { getCookie } from "@/hooks/useCookie";
import axios from "axios";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
const NextSEO = dynamic(() => import("@/common/NextSeo"), { ssr: false });
const HomePage = dynamic(() => import("@/module/homepage"), { ssr: false });

export default function Home() {
  const [blogDataLoading, setBlogDataLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [trendingBlogData, setTrendingBlogData] = useState([]);
  const [blogsTotalCount, setBlogsTotalCount] = useState(0);
  const [seoData, setSeoData] = useState({});
  const [limit, setLimit] = useState(10);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [limit]);

  const fetchData = async () => {
    const userToken = getCookie("userToken");
    setBlogDataLoading(true);

    try {
      const [blogCategoryResp, blogsResp, trendingBlogResp, seoResp] = await Promise.all([
        ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=10"),
        userToken
          ? axios.get(`${BaseURL}blog-services/blogs/get-editor-blogs?isActive=true&limit=${limit}`, {
              ...getHttpOptions(),
              headers: { "x-auth-token": userToken },
            })
          : ApiGet(`blog-services/blogs/get?isActive=true&limit=${limit}`),
        ApiGet(`blog-services/blogs/get?isTrending=true&skip=1&limit=3`),
        ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=home`),
      ]);

      const blogsData = userToken ? blogsResp.data?.payload?.editor_blogs : blogsResp.data?.payload?.blogs;
      console.log(`blogCategoryResp.data?.payload?.blog_category`, blogCategoryResp?.data.payload.blog_category);
      setBlogData(blogsData || []);
      setBlogsTotalCount(blogsResp.data?.payload?.counts || 0);
      setBlogCategoryData(blogCategoryResp?.data?.payload?.blog_category);
      setTrendingBlogData(trendingBlogResp.data?.payload?.blogs || []);

      const homePageSeoData = seoResp.data?.payload?.privacy_policy;
      const seoData = {
        Title: homePageSeoData[0]?.metaTitle || "",
        Description: homePageSeoData[0]?.metaDescription || "",
        KeyWords: homePageSeoData[0]?.metaKeyWords?.join(", ") || "",
        url: `${EXTERNAL_DATA_URL}`,
      };
      setSeoData(seoData);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setBlogDataLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (blogData?.length < blogsTotalCount) {
      setLimit((prevLimit) => prevLimit + 5);
    }
  };

  useEffect(() => {
    const eventNames = ["logout", "onBoardingComplete"];
    const handleMultipleEvents = () => {
      fetchData();
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
      <Suspense fallback={<p>loading...</p>}>
        <HomePage
          handleGetBlogsData={fetchData}
          onLoadMore={handleLoadMore}
          isLoadMoreDisabled={blogData?.length >= blogsTotalCount}
          blogDataLoading={blogDataLoading}
          getBlogsData={blogData}
          getBlogCategoryData={blogCategoryData}
          getTrendingBlogData={trendingBlogData}
        />
      </Suspense>
    </>
  );
}

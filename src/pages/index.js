import { ApiGet, ApiGetNoAuth, BaseURL, getHttpOptions } from "@/helpers/API/ApiData";
import { getCookie } from "@/hooks/useCookie";
import HomePage from "@/module/homepage";
import ProfileDetails from "@/module/profileSetting/profileDetails";
import axios from "axios";
import { parse } from "cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home({ getBlogCategoryData, getBlogsData, getTrendingBlogData, blogsTotalCount }) {
  const [blogDataLoading, setBlogDataLoading] = useState(false);
  const [blogData, setBlogData] = useState(getBlogsData);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (limit > 10) {
      handleGetBlogsData();
    }
  }, [limit]);

  const handleGetBlogsData = async () => {
    const userToken = getCookie("userToken");
    setBlogDataLoading(true);
    try {
      const response =
        userToken != undefined ? await ApiGet(`blog-services/blogs/get-editor-blogs?isActive=true&limit=${limit}`) : await ApiGet(`blog-services/blogs/get?isActive=true&limit=${limit}`);
      const data = userToken != undefined ? response?.data?.payload?.editor_blogs : response?.data?.payload?.blogs;
      setBlogData(data);
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
    } finally {
      setBlogDataLoading(false);
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      handleGetBlogsData();
    };

    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, []);
  const handleLoadMore = () => {
    if (blogData?.length < blogsTotalCount) {
      setLimit((prevLimit) => prevLimit + 5);
    }
  };

  return (
    <>
      <HomePage
        handleGetBlogsData={handleGetBlogsData}
        onLoadMore={handleLoadMore}
        isLoadMoreDisabled={blogData?.length >= blogsTotalCount}
        blogDataLoading={blogDataLoading}
        getBlogsData={blogData}
        getBlogCategoryData={getBlogCategoryData}
        getTrendingBlogData={getTrendingBlogData}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parse(req?.headers?.cookie || "");
  const userToken = cookies?.userToken;
  let headers = {};
  headers["x-auth-token"] = `${userToken}`;

  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=10").then((resp) => resp?.data?.payload);
    const blogsData = userToken
      ? await axios
          .get(BaseURL + "blog-services/blogs/get-editor-blogs?isActive=true&limit=10", {
            ...getHttpOptions(),
            headers: headers,
          })
          .then((resp) => resp?.data?.payload)
      : await ApiGet("blog-services/blogs/get?isActive=true&skip=1&limit=10").then((resp) => resp?.data?.payload);
    const trendingBlogData = await ApiGet(`blog-services/blogs/get?isTrending=true&skip=1&limit=3`).then((resp) => resp?.data?.payload);

    return {
      props: {
        getBlogsData: userToken ? blogsData?.editor_blogs : blogsData?.blogs || [],
        blogsTotalCount: blogsData?.counts || 0,
        getBlogCategoryData: blogCategoryData?.blog_category || [],
        getTrendingBlogData: trendingBlogData?.blogs || [],
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Facing error",
      },
    };
  }
}

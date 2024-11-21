import { ApiGet, ApiGetNoAuth } from "@/helpers/API/ApiData";
import Notifications from "@/module/notifications";
import React from "react";

export default function index({ isTrendingBlogsData,getBlogCategoryData }) {
  return (
    <div>
      <Notifications isTrendingBlogsData={isTrendingBlogsData} getBlogCategoryData={getBlogCategoryData} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=10").then((resp) => resp?.data?.payload);
    const isTrendingBlogsData = await ApiGetNoAuth("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);

    return {
      props: {
        isTrendingBlogsData: isTrendingBlogsData || [],
        getBlogCategoryData: blogCategoryData?.blog_category || [],
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

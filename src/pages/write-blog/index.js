import { ApiGet } from "@/helpers/API/ApiData";
import WriteBlog from "@/module/writeBlog";
import React from "react";

export default function index({ getBlogCategoryData }) {
  return (
    <div>
      <WriteBlog getBlogCategoryData={getBlogCategoryData} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    //1
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    return {
      props: {
        getBlogCategoryData: blogCategoryData?.blog_category,
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

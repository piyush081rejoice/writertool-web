import { ApiGet } from "@/helpers/API/ApiData";
import PaymentHistory from "@/module/PaymentHistory";
import WriteBlog from "@/module/writeBlog";
import Breadcrumb from "@/module/writeBlog/breadcrumb";
import React from "react";

export default function index({ getBlogCategoryData }) {
  return (
    <div>
      <Breadcrumb dynamicList={"payment history"} />
      <PaymentHistory />
    </div>
  );
}

// export async function getServerSideProps() {
//   try {
//     //1
//     const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
//     return {
//       props: {
//         getBlogCategoryData: blogCategoryData?.blog_category,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: "faceing error",
//       },
//     };
//   }
// }

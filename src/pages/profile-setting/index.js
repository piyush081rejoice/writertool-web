import { ApiGet, BaseURL, getHttpOptions } from "@/helpers/API/ApiData";
import ProfileSetting from "@/module/profileSetting";
import axios from "axios";
import { parse } from "cookie";
import React from "react";

export default function index({ userProfileData, productCategoryData, blogCategories }) {
  return (
    <div>
      <ProfileSetting userProfileData={userProfileData} productCategoryData={productCategoryData} blogCategories={blogCategories} />
    </div>
  );
}
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parse(req?.headers?.cookie || "");
  const userToken = cookies?.userToken;
  let headers = {};
  headers["x-auth-token"] = `${userToken}`;

  try {
    const userProfileData = await axios.get(BaseURL + "user-services/user/get-profile", { ...getHttpOptions(), headers: headers }).then((resp) => resp?.data?.payload);
    const productCategory = await ApiGet(`user-services/product-category/get`);
    const blogCategories = await ApiGet(`blog-services/blog-categories/get?isActive=true&skip=1&limit=50`);

    return {
      props: {
        userProfileData: userProfileData[0] || [],
        productCategoryData: productCategory?.data?.payload,
        blogCategories: blogCategories?.data?.payload?.blog_category,
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

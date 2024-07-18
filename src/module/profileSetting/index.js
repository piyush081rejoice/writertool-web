import Breadcrumb from "../writeBlog/breadcrumb";
import ProfileDetails from "./profileDetails";
export default function ProfileSetting({userProfileData,productCategoryData,blogCategories}) {
  return (
    <div>
      <Breadcrumb dynamicList={"Profile Setting"} />
      <ProfileDetails userProfileData={userProfileData} getProductCategoryData={productCategoryData} blogCategories={blogCategories} />
    </div>
  );
}

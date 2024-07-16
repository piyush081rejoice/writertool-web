import Breadcrumb from "../writeBlog/breadcrumb";
import YourlibraryDetails from "./yourlibraryDetails";
export default function Yourlibrary({isTrendingBlogsData,getBlogCategoryData}) {
  return (
    <div>
      <Breadcrumb dynamicList={"Library"} />
      <YourlibraryDetails {...{ isTrendingBlogsData ,getBlogCategoryData }} />
    </div>
  );
}

import { ApiGet, ApiGetNoAuth } from "@/helpers/API/ApiData";
import YourStories from "@/module/yourStories";

const YourStoriesMain = ({isTrendingBlogsData,getBlogCategoryData}) => {
  return (
    <YourStories {...{isTrendingBlogsData,getBlogCategoryData}}/>
  );
};

export default YourStoriesMain;


export async function getServerSideProps() {
  try {
    const isTrendingBlogsData = await ApiGetNoAuth("blog-services/blogs/get?isTrending=true&skip=1&limit=3").then((resp) => resp?.data?.payload?.blogs);
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    return {
      props: {
        isTrendingBlogsData: isTrendingBlogsData || [],
        getBlogCategoryData: blogCategoryData?.blog_category || [],
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

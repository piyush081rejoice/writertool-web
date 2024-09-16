import BlogInsideDetails from "./blogInsideDetails";
export default function BlogInside({ isTrendingBlogsData, singleBlog }) {
  return (
    <div>
      <BlogInsideDetails isTrendingBlogsData={isTrendingBlogsData} getSingleBlogData={singleBlog} />
    </div>
  );
}

import TrendingBlog from "@/module/homepage/editorsPick/trendingBlog";
import Newsletter from "@/module/homepage/latestPosts/newsletter";
import Breadcrumb from "@/module/writeBlog/breadcrumb";
import styles from "./blogInsideDetails.module.scss";
import BlogInsideInformation from "./blogInsideInformation";
export default function BlogInsideDetails({ slugId, isTrendingBlogsData, getSingleBlogData }) {
  return (
    <div className={styles.blogInsideDetails}>
      <div className="container">
        <Breadcrumb dynamicList={slugId} />
        <div style={{ marginTop: "40px" }} className={styles.grid}>
          <div className={styles.gridItems}>
            <BlogInsideInformation singleBlog={getSingleBlogData} slugId={slugId} />
          </div>
          <div className={styles.gridItems}>
            <div className={styles.stickyTop}>
              <div className={styles.trendingBlogDesign}>
                <TrendingBlog getTrendingBlogData={isTrendingBlogsData} />
              </div>
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

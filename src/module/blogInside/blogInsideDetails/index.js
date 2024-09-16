import TrendingBlog from "@/module/homepage/editorsPick/trendingBlog";
import Newsletter from "@/module/homepage/latestPosts/newsletter";
import Breadcrumb from "@/module/writeBlog/breadcrumb";
import styles from "./blogInsideDetails.module.scss";
import BlogInsideInformation from "./blogInsideInformation";
import { useRouter } from "next/router";
export default function BlogInsideDetails({ isTrendingBlogsData, getSingleBlogData }) {
  const router = useRouter();
  return (
    <>
      <Breadcrumb dynamicList={router.query?.slugId} />
      <div className={styles.blogInsideDetails}>
        <div className="container">
          <div style={{ marginTop: "40px" }} className={styles.grid}>
            <div className={styles.gridItems}>
              <BlogInsideInformation singleBlog={getSingleBlogData} />
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
    </>
  );
}

import React from "react";
import styles from "./notificationsDetails.module.scss";
import WaveIcon from "@/assets/icons/waveIcon";
import NotificationsItems from "../notificationsItems";
import TrendingBlog from "@/module/homepage/editorsPick/trendingBlog";
import Newsletter from "@/module/homepage/latestPosts/newsletter";
import TagClouds from "@/module/homepage/latestPosts/tagClouds";
export default function NotificationsDetails({isTrendingBlogsData,getBlogCategoryData}) {
  return (
    <div className={styles.notificationsDetails}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.gridItems}>
            <div className={styles.pageTitle}>
              <h1>Notifications</h1>
              <WaveIcon />
            </div>
            <NotificationsItems />
          </div>
          <div className={styles.gridItems}>
            <div className={styles.TrendingBlogBox}>
              <TrendingBlog getTrendingBlogData={isTrendingBlogsData} />
            </div>
            <div className={styles.newsletterAlignment}>
              <Newsletter />
            </div>
            <TagClouds getBlogCategoryData={getBlogCategoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}

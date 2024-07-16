import DownArrow from "@/assets/icons/downArrow";
import WaveIcon from "@/assets/icons/waveIcon";
import TrendingBlog from "@/module/homepage/editorsPick/trendingBlog";
import Newsletter from "@/module/homepage/latestPosts/newsletter";
import TagClouds from "@/module/homepage/latestPosts/tagClouds";
import { useEffect, useState } from "react";
import PublishedStories from "../PublishedStories";
import styles from "./yourStoriesDetails.module.scss";
import { ApiGet } from "@/helpers/API/ApiData";
import toast from "react-hot-toast";
const CardImage = '/assets/images/latest-post.png';
const ProfileImage = '/assets/images/profile.png'
const BookmarkIcon = '/assets/icons/bookmark.svg'
const MinusIcon = '/assets/icons/minus.svg'
const MenuIcon = '/assets/icons/menu.svg'


export default function YourStoriesDetails({isTrendingBlogsData,getBlogCategoryData}) {
  const [navTab, setNavTab] = useState("1");

  return (
    <div>
      <div className={styles.yourStoriesDetailsAlignment}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.gridItems}>
              <div className={styles.pageTitle}>
                <h1>Your Stories</h1>
                <WaveIcon />
              </div>
              <div className={styles.yourStoriesAlignment}>
                <div className={styles.tab}>
                  <span className={navTab == "1" ? styles.active :""} onClick={() => setNavTab("1")}>Drafts</span>
                  <span className={navTab == "2" ? styles.active :""} onClick={() => setNavTab("2")}>Published</span>
                  <span className={navTab == "3" ? styles.active :""} onClick={() => setNavTab("3")}>Pending</span>
                </div>
                {navTab === "1" && <PublishedStories status="Draft" />}
                {navTab === "2" && <PublishedStories status="Published" />}
                {navTab === "3" && <PublishedStories status="Pending" />}
              </div>
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
      
    </div>
  );
}

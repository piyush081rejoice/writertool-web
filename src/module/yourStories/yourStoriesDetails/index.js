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


export default function YourStoriesDetails() {
  const [navTab, setNavTab] = useState("1");
  const [isTrendingData, setIsTrendingData] = useState([])
    useEffect(() => {
        handleIsTrendingData();
      }, []);
      const handleIsTrendingData = async () => {
        try {
          const response = await ApiGet(`blog-services/blogs/get?isTrending=true&skip=1&limit=3`);
          const data = response?.data?.payload?.blogs;
        
          setIsTrendingData(data);
        } catch (error) {
          toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
        }
      };  
  
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
              <TrendingBlog getTrendingBlogData={isTrendingData} />
              </div>
              <div className={styles.newsletterAlignment}>
                <Newsletter />
              </div>
              <TagClouds />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

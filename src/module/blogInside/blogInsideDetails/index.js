import React, { useEffect, useState } from 'react'
import styles from './blogInsideDetails.module.scss';
import TrendingBlog from '@/module/homepage/editorsPick/trendingBlog';
import Newsletter from '@/module/homepage/latestPosts/newsletter';
import BlogInsideInformation from './blogInsideInformation';
import Breadcrumb from '@/module/writeBlog/breadcrumb';
import toast from 'react-hot-toast';
import { ApiGet } from '@/helpers/API/ApiData';
export default function BlogInsideDetails({slugId}) {
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
    <div className={styles.blogInsideDetails}>
      <div className="container">
        <Breadcrumb dynamicList={slugId} />
        {/* <div className={styles.breadcumbalignment}>
          <span>Writertools</span>
          <span>/</span>
          <span>Trending</span>
          <span>/</span>
          <span>3 Easy Ways To Make Your iPhone Faster</span>
        </div> */}
        <div style={{marginTop:"40px"}} className={styles.grid}>
          <div className={styles.gridItems}>
            <BlogInsideInformation slugId={slugId} />
          </div>
          <div className={styles.gridItems}>
            <div className={styles.stickyTop}>
            <div className={styles.trendingBlogDesign}>
              <TrendingBlog getTrendingBlogData={isTrendingData} />
            </div>
            <Newsletter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

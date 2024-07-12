import React from 'react'
import styles from './blogInsideDetails.module.scss';
import TrendingBlog from '@/module/homepage/editorsPick/trendingBlog';
import Newsletter from '@/module/homepage/latestPosts/newsletter';
import BlogInsideInformation from './blogInsideInformation';
export default function BlogInsideDetails() {
  return (
    <div className={styles.blogInsideDetails}>
      <div className="container">
        <div className={styles.breadcumbalignment}>
          <span>Writertools</span>
          <span>/</span>
          <span>Trending</span>
          <span>/</span>
          <span>3 Easy Ways To Make Your iPhone Faster</span>
        </div>
        <div className={styles.grid}>
          <div className={styles.gridItems}>
            <BlogInsideInformation />
          </div>
          <div className={styles.gridItems}>
            <div className={styles.stickyTop}>
            <div className={styles.trendingBlogDesign}>
              <TrendingBlog />
            </div>
            <Newsletter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

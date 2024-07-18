import React from 'react'
import styles from './yourlibraryDetails.module.scss';
import Recommended from '@/shared/components/recommended';
import TrendingBlog from '@/module/homepage/editorsPick/trendingBlog';
import Newsletter from '@/module/homepage/latestPosts/newsletter';
import TagClouds from '@/module/homepage/latestPosts/tagClouds';
export default function YourlibraryDetails({isTrendingBlogsData ,getBlogCategoryData}) {
    return (
        <div className={styles.yourlibraryDetails}>
            <div className='container'>
                <div className={styles.grid}>
                    <div className={styles.gridItems}>
                        <Recommended differentName={"Your library"} isSavedBlogs  />
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
    )
}

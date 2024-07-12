import React, { useEffect, useState } from 'react'
import styles from './categoryInformation.module.scss';
import Recommended from '@/shared/components/recommended';
import TrendingBlog from '@/module/homepage/editorsPick/trendingBlog';
import Newsletter from '@/module/homepage/latestPosts/newsletter';
import toast from 'react-hot-toast';
import { ApiGet } from '@/helpers/API/ApiData';
export default function CategoryInformation({slugId}) {
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
        <div className={styles.categoryInformationAlignment}>
            <div className='container'>
                <div className={styles.grid}>
                    <div>
                    <Recommended {...{slugId}} />
                    </div>
                    <div>
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

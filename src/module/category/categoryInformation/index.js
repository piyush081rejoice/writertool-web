import TrendingBlog from '@/module/homepage/editorsPick/trendingBlog';
import Newsletter from '@/module/homepage/latestPosts/newsletter';
import Recommended from '@/shared/components/recommended';
import styles from './categoryInformation.module.scss';
export default function CategoryInformation({slugId,isTrendingBlogsData}) {

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
                            <TrendingBlog getTrendingBlogData={isTrendingBlogsData} />
                        </div>
                        <Newsletter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

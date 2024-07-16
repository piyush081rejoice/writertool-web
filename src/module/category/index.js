import React from 'react'
import styles from './category.module.scss';
import Tab from '@/shared/components/tab';
import CategoryTopbar from './categoryTopbar';
import CategoryInformation from './categoryInformation';
export default function Category({isTrendingBlogsData,getBlogCategoryData ,slugId}) {
    return (
        <div>
            <div className={styles.tabSpacer}>
                <Tab {...{ getBlogCategoryData }} />
            </div>
            <CategoryTopbar {...{slugId}} />
            <CategoryInformation {...{slugId,isTrendingBlogsData}} />
        </div>
    )
}

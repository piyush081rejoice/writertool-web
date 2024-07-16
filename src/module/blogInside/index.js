import React from 'react'
import styles from './blogInside.module.scss';
import BlogInsideDetails from './blogInsideDetails';
export default function BlogInside({slugId,isTrendingBlogsData,singleBlog}) {
  return (
    <div>
      <BlogInsideDetails slugId={slugId} isTrendingBlogsData={isTrendingBlogsData} getSingleBlogData={singleBlog}/>
    </div>
  )
}

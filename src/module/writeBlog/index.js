import React from 'react'
import styles from './writeBlog.module.scss';
import Breadcrumb from './breadcrumb';
import WriteBlogInformation from './writeBlogInformation';
export default function WriteBlog({getBlogCategoryData ,updateId,updateBlogData}) {
  return (
    <div>
        <Breadcrumb dynamicList={updateId ? "Update Blog" :"Create Blog"}/>
        <WriteBlogInformation getBlogCategoryData={getBlogCategoryData} updateId={updateId} updateBlogData={updateBlogData}/>
    </div>
  )
}

import React from 'react'
import styles from './blogInside.module.scss';
import BlogInsideDetails from './blogInsideDetails';
export default function BlogInside({slugId}) {
  return (
    <div>
      <BlogInsideDetails slugId={slugId}/>
    </div>
  )
}

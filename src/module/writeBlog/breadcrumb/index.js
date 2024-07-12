import React from 'react'
import styles from './breadcrumb.module.scss';
export default function Breadcrumb({dynamicList}) {
  return (
    <div className={styles.breadcrumbAllContentAlignment}>
      <div className='container'>
        <div className={styles.contentAlignment}>
            <span>Writertools </span>
            <span>/</span>
            <span>{dynamicList}</span>
        </div>
      </div>
    </div>
  )
}

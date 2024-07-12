import React from 'react'
import styles from './deleteBlog.module.scss';
import classNames from 'classnames';
const DangerIcon = '/assets/icons/danger.svg';
export default function DeleteBlog() {
  return (
    <div className={ classNames(styles.openModalWrapper , styles.deleteBlogWrapper) }>
      <div className={styles.modal}>
        <div className={styles.centerIcon}>
            <img src={DangerIcon} alt='DangerIcon'/>
        </div>
        <p>delete Blog</p>
        <span>
        Are You sure want to delete this blog? 
        This action cannot be undone
        </span>
        <div className={styles.buttonGrid}>
            <button className={styles.fill}>Cancel</button>
            <button className={styles.dangerButton}>Delete</button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import styles from './latestPosts.module.scss';
import Newsletter from './newsletter';
import TagClouds from './tagClouds';
import WaveIcon from '@/assets/icons/waveIcon';
import LazyImage from '@/helpers/lazyImage';
import Image from 'next/image';
import { DateConvert, GenerateDescription } from '@/common';
const CardImage = '/assets/images/latest-post.png';
const ProfileImage = '/assets/images/profile.png'
const BookmarkIcon = '/assets/icons/bookmark.svg'
const MinusIcon = '/assets/icons/minus.svg'
const MenuIcon = '/assets/icons/menu.svg'

export default function LatestPosts({getBlogsData}) {
  return (
    <div className={styles.latestPostsContnetAlignment}>
      <div className='container'>
        <div className={styles.grid}>
          <div className={styles.gridItems}>
            <div className={styles.latestpostsTitle}>
              <h2>Latest Posts</h2>
              <WaveIcon />
            </div>
            <div className={styles.subBoxDesign}>
            <div className={styles.allCardDesign}>
              {
                getBlogsData?.slice(6, 10)?.map((item,key) => {
                  return (
                    <div className={styles.card} key={key}>
                      <div className={styles.cardImage}>
                      <Image src={item?.thumbnail} alt="CardImage" height={216} width={301} className={styles.cardImageStyle} />
                      </div>
                      <div>
                        <div className={styles.firstColumn}>
                          <div className={styles.leftContent}>
                            <div className={styles.profileImage}>
                            <Image src={item?.Users?.profileImage ? item?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                            </div>
                            <span>{item?.Users?.userName}</span>
                          </div>
                          {/* <ul>
                            <li>Trending</li>
                          </ul> */}
                          <ul>
                            <li>{DateConvert(item?.createdAt)}</li>
                          </ul>
                        </div>
                        <h3>{item?.title}</h3>
                        <p>{GenerateDescription(item?.description)}</p>
                        <div className={styles.iconAlignment}>
                          <img src={BookmarkIcon} alt='BookmarkIcon' width="100%" height="100%" />
                          <img src={MinusIcon} alt='MinusIcon' width="100%" height="100%" />
                          <img src={MenuIcon} alt='MenuIcon' width="100%" height="100%" />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={styles.loadMoreButton}>
              <button type='button' aria-label='Load More'>Load More</button>
            </div>  
            </div>
          </div>
          <div className={styles.gridItems}>
            <div className={styles.stickyTop}>
            <Newsletter />
            <TagClouds />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import styles from './commonSection.module.scss';
import WaveIcon from '@/assets/icons/waveIcon';
const CardImage = '/assets/images/editors-pick.png';
import LazyImage from '@/helpers/lazyImage';
import EditorsPickDetails from '@/module/homepage/editorsPick/editorsPickDetails';
export default function CommonSection() {
    return (
        <div className={styles.commonSection}>
            <div className={styles.title}>
                <h2>
                More from Katen Doe
                </h2>
                <WaveIcon />
            </div>
            <div className={styles.subGrid}>
                            <div className={styles.subGridItems}>
                                <EditorsPickDetails/>
                            </div>
                            <div className={styles.subGridItems}>
                               {
                                [...Array(4)].map((i)=> {
                                    return(
                                        <div className={styles.editorsCard} key={i}>
                                        <div className={styles.editorsCardImage}>
                                            <LazyImage
                                                image={{
                                                    src: CardImage,
                                                    alt: "CardImage",
                                                }}
                                                className={styles.imageStyle}
                                            />
                                        </div>
                                        <div className={styles.editorsCardItems}>
                                            <h3>Easy Ways To Learn
                                                Everything About
                                                Construction    </h3>
                                                <span>August 20, 2024</span>
                                        </div>
                                    </div>
                                    )
                                })
                               }
                            </div>
                        </div>
        </div>
    )
}

import React from 'react'
import styles from './tagClouds.module.scss';
import WaveIcon from '@/assets/icons/waveIcon';
export default function TagClouds() {
    return (
        <div className={styles.tagCloudsBox}>
            <div className={styles.boxTitle}>
                <h2>Tag Clouds</h2>
                <div className={styles.iconCenter}>
                    <WaveIcon />
                </div>
            </div>
            <div className={styles.buttonFlex}>
                <button type='button' aria-label='#UI/UX Designing'>#UI/UX Designing</button>
                <button type='button' aria-label='#React'>#React</button>
                <button type='button' aria-label='#Flutter'>#Flutter</button>
                <button type='button' aria-label='#History'>#History</button>
                <button type='button' aria-label='#Lifestyle'>#Lifestyle</button>
                <button type='button' aria-label='#Learning'>#Learning</button>
                <button type='button' aria-label='#Education'>#Education</button>
                <button type='button' aria-label='#Content'>#Content</button>
                <button type='button' aria-label='#Lifestyle'>#Lifestyle</button>
                <button type='button' aria-label='#Featured'>#Featured</button>
                <button type='button' aria-label='#Trending'>#Trending</button>
            </div>
        </div>
    )
}

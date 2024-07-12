import React from 'react'
import styles from './newsletter.module.scss';
import WaveIcon from '@/assets/icons/waveIcon';
export default function Newsletter() {
  return (
    <div className={styles.newsletter}>
      <div className={styles.boxTitle}>
        <h2>Newsletter</h2>
        <div className={styles.iconCenter}>
            <WaveIcon />
        </div>
      </div>
      <div className={styles.textStyle}>
        <p>Join 70,000 subscribers!</p>
      </div>
      <div className={styles.input}>
        <input type='text' placeholder='Email address...'/>
      </div>
      <div className={styles.buttonDesign}>
        <button aria-label='Sing up to Subscribe' type='button'>Sing up to Subscribe</button>
      </div>
      <div className={styles.lastText}>
        <p>By signing up, you agree to our <a href='#Privacy Policy'>Privacy Policy</a></p>
      </div>
    </div>
  )
}

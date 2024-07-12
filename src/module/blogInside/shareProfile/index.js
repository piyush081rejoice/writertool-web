import React from 'react'
import styles from './shareProfile.module.scss';
import FacebookIcon from '@/assets/icons/facebookIcon';
import TwitterIcon from '@/assets/icons/twitterIcon';
import LinkdinIcon from '@/assets/icons/linkdinIcon';
import TelegramIcon from '@/assets/icons/telegramIcon';
import GmailIcon from '@/assets/icons/gmailIcon';
import LazyImage from '@/helpers/lazyImage';
const ProfileLg = '/assets/images/profile-lg.png';
export default function ShareProfile() {
    return (
        <div className={styles.shareProfileAllContnet}>
            <div className={styles.firstColumnAlignment}>
                <div className={styles.leftContent}>
                    <span>Share this:</span>
                    <div className={styles.socialIconAlignment}>
                        <FacebookIcon />
                        <TwitterIcon />
                        <LinkdinIcon />
                        <TelegramIcon />
                        <GmailIcon />
                    </div>
                </div>
                <div className={styles.buttonFlex}>
                    <button type='button' aria-label='#Flutter'>#Flutter</button>
                    <button type='button' aria-label='#History'>#History</button>
                    <button type='button' aria-label='#Lifestyle'>#Lifestyle</button>
                </div>
            </div>
            <div className={styles.profileBox}>
                <div className={styles.profile}>
                <LazyImage
                    image={{
                        src: ProfileLg,
                        alt: "ProfileLg",
                    }}
                    className={styles.profileImage}
                />
                </div>
                <div>
                    <h3>Katen Doe</h3>
                    <p>
                        Hello, I’m a content writer who is fascinated by content fashion, celebrity and lifestyle. She helps clients bring the right content to the 
                        right people.
                    </p>
                    <div className={styles.icons}>
                    <FacebookIcon />
                        <TwitterIcon />
                        <LinkdinIcon />
                        <TelegramIcon />
                        <GmailIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

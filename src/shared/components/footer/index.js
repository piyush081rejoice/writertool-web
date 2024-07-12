import React from 'react'
import styles from './footer.module.scss';
import LocationIcon from '@/assets/icons/locationIcon';
import CallIcon from '@/assets/icons/callIcon';
import EmailIcon from '@/assets/icons/emailIcon';
import Link from 'next/link';
import Image from 'next/image';
const WriterToolsFooterLogo = '/assets/logo/FooterLogo.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footerAlignment}>
          <div className={styles.firstContnet}>
            <div className={styles.logo}>
              <Image src={WriterToolsFooterLogo} alt='WriterTools' width={164} height={62} />
            </div>
            <div className={styles.text}>
              <p>
              Write with confidence. The WriterTools Blog empowers you to craft captivating content with ease. Discover tools and strategies for powerful writing and engaging reading.
              </p>
            </div>
          </div>
          <div>
            <h2>
              Useful Links
            </h2>
            <div className={styles.menu}>
              <Link href="/write-blog">Write Blogs</Link>
              <Link href="/notifications">Notification</Link>
              <a>Contact Us</a>
            </div>
          </div>
          <div>
            <h2>
              Contact Us
            </h2>
            <div className={styles.iconTextAlignment}>
              <LocationIcon />
              <a>
                1201-1206, 12th Floor, Lorem Ipsum
                simply dummy text printing
              </a>
            </div>
            <div className={styles.iconTextAlignment}>
              <EmailIcon />
              <a href="mailto:writertools@gmail.com">
                writertools@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className={styles.copyRight}>
          <p>Copyright 2024. All right reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

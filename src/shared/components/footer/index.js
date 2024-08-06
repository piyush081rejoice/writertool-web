import { FacebookWhiteIcon, InstagramWhiteIcon, LinkedinWhiteIcon, TwitterWhiteIcon, YoutubeWhiteIcon } from "@/assets/icons/Icons";
import LazyImage from "@/helpers/lazyImage";
import Link from "next/link";
import styles from "./footer.module.scss";

const WriterToolsFooterLogo = "/assets/logo/FooterLogo.png";

const Footer = () => {
  const handleLinkClick = (link) => {
    window.open(link);
  };
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerAlignment}>
          <div className={styles.firstContnet}>
            <div className={styles.logo}>
              <LazyImage src={WriterToolsFooterLogo} alt="WriterTools" width={164} height={62} />
            </div>
            <div className={styles.text}>
              <p>Write with confidence. The WriterTools Blog empowers you to craft captivating content with ease. Discover tools and strategies for powerful writing and engaging reading.</p>
            </div>
          </div>
          <div>
            <h2>Useful Links</h2>
            <div className={styles.menu}>
              <Link href="/category">Explore Blogs</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
              <Link href="/disclaimer">Disclaimer</Link>
              <Link target="_blank" href="/sitemap/blog.xml">Blog Sitemap</Link>
              {/* <a>Contact Us</a> */}
            </div>
          </div>
          <div>
            <h2>Social Medias</h2>
            <div className={styles.iconTextAlignment}>
              <div onClick={() => handleLinkClick("https://www.facebook.com/")}>
                <FacebookWhiteIcon />
              </div>
              <div onClick={() => handleLinkClick("https://twitter.com/login")}>
                <TwitterWhiteIcon />
              </div>
              <div onClick={() => handleLinkClick("https://www.linkedin.com/")}>
                <LinkedinWhiteIcon />
              </div>
              <div onClick={() => handleLinkClick("https://www.instagram.com/")}>
                <InstagramWhiteIcon />
              </div>
              <div onClick={() => handleLinkClick("https://www.youtube.com/")}>
                <YoutubeWhiteIcon />
              </div>

              {/* <a>
                1201-1206, 12th Floor, Lorem Ipsum
                simply dummy text printing
              </a> */}
            </div>
            {/* <div className={styles.iconTextAlignment}>
              <EmailIcon />
              <a href="mailto:writertools@gmail.com">
                writertools@gmail.com
              </a>
            </div> */}
          </div>
        </div>
        <div className={styles.copyRight}>
          <p>Copyright 2024. All right reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

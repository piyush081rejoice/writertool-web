import Arrow from "@/assets/icons/arrow";
import { formatTitleCase } from "@/common";
import LazyImage from "@/helpers/lazyImage";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import styles from "./trendingBlog.module.scss";
const ArrowIcon = "/assets/icons/arrow.svg";
const ProfileImage = "/assets/images/profile-sm.png";
export default function TrendingBlog({ getTrendingBlogData }) {
  const  router = useRouter()  
  return (
    <div className={styles.trendingBlog}>
      <div className={styles.sectionTitle}>
        <img src={ArrowIcon} alt="ArrowIcon" />
        <h3>Trending blog’s </h3>
      </div>
      <div className={styles.blogCardalignment}>
        {getTrendingBlogData?.length > 0
          ? getTrendingBlogData?.map((item, i) => {
              return (
                <div className={styles.blogCard} key={i}>
                  <h3 onClick={()=>router.push(`/blog/${item?.slugId}`)} >{item?.title}</h3>
                  <span>{item?.sortDescription ? item?.sortDescription : ""}</span>
                  <div className={styles.profileGrid}>
                    <div className={styles.profileImage}>
                      <LazyImage src={item?.Users?.profileImage ? item?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                    </div>
                    <div>
                      <p>{formatTitleCase(item?.Users?.userName)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={styles.blogCard}>
                  <Skeleton height={25} width={356} />
                  <div style={{display:"flex" ,gap:"10px"}}>
                    <div >
                      <Skeleton circle height={50} width={50} />
                    </div>
                    <div>
                      <Skeleton height={20} width={301} />
                      <Skeleton height={20} width={301} />
                    </div>
                  </div>
                </div>
              ))}
      </div>
      <Link href="/category">
        <div className={styles.moreButton}>
          <span>More Trending Blog’s</span>
          <Arrow />
        </div>
      </Link>
    </div>
  );
}

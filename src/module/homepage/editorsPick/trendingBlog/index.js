import React from "react";
import styles from "./trendingBlog.module.scss";
import LazyImage from "@/helpers/lazyImage";
import Arrow from "@/assets/icons/arrow";
import Link from "next/link";
import { GenerateDescription } from "@/common";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
const ArrowIcon = "/assets/icons/arrow.svg";
const ProfileImage = "/assets/images/profile-sm.png";
export default function TrendingBlog({ getTrendingBlogData }) {
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
                  <h3>{item?.title}</h3>
                  <span>{GenerateDescription(item?.description)}</span>
                  <div className={styles.profileGrid}>
                    <div className={styles.profileImage}>
                      <Image src={item?.Users?.profileImage ? item?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                    </div>
                    <div>
                      <p>{item?.Users?.userName}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={styles.blogCard}>
                  <div>
                    <Skeleton height={216} width={301} />
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

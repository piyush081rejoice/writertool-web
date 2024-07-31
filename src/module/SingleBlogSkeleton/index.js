import React from "react";
import styles from "./SingleBlogSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";

const SingleBlogSkeleton = () => {
  return (
    <div className={styles.singleBlogSkeletonWrapper}>
      <Skeleton className={styles.singleBlogSkeletonImage} />
      <div className={styles.cardDetails}>
        <div className={styles.firstColum}>
          <Skeleton height={34} width={34} circle />
          <Skeleton width={80} height={20} />
          <Skeleton width={130} height={20} />
        </div>
        <div className={styles.heading}>
          <Skeleton width={"90%"} height={25} />
        </div>
        <div className={styles.details}>
          <Skeleton width={"90%"} height={20} />
          <Skeleton width={"90%"} height={20} />
          <Skeleton width={"90%"} height={20} />
          <Skeleton width={"90%"} height={20} />
          <Skeleton width={"90%"} height={20} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;

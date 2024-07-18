import { DateConvert } from "@/common";

import Recommended from "@/shared/components/recommended";
import { marked } from "marked";
import Skeleton from "react-loading-skeleton";
import ShareProfile from "../../shareProfile";
import styles from "./blogInsideInformation.module.scss";
import { useEffect } from "react";
import LazyImage from "@/helpers/lazyImage";
import CommonSection from "@/shared/components/commonSection";
const ProfileImage = "/assets/images/profile.png";
export default function BlogInsideInformation({ singleBlog }) {
  useEffect(() => {
    if (!singleBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [singleBlog]);
  return (
    <>
      {!singleBlog ? (
        <div style={{ marginTop: "25px" }}>
          <Skeleton height={30} width={775} />
          <Skeleton style={{ marginTop: "25px" }} height={30} width={775} />
          <Skeleton style={{ marginTop: "25px" }} height={600} width={775} />
        </div>
      ) : (
        <div className={styles.blogInsideInformation}>
          <div className={styles.title}>
            <h2>{singleBlog?.title}</h2>
          </div>
          <div className={styles.personalInformation}>
            <div className={styles.profileInformation}>
              <div className={styles.img}>
                <LazyImage src={singleBlog?.uid?.profileImage ? singleBlog?.uid?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImage} />
              </div>
              <span>{singleBlog?.uid?.userName}</span>
            </div>
            {singleBlog?.isTrending ? (
              <ul>
                <li>Trending</li>
              </ul>
            ) : null}
            <ul>
              <li>{DateConvert(singleBlog?.createdAt)}</li>
            </ul>
            {/* <div className={styles.messageAlignment}>
          <MessageIcon />
          <span> (12)</span>
        </div> */}
          </div>
          <div className={styles.blogImage}>
            <LazyImage  src={singleBlog?.coverPhoto} alt="BlogImage"  />
          </div>
          <div className={styles.details}>
            <p>{singleBlog?.sortDescription}</p>
            <div  dangerouslySetInnerHTML={{__html: marked(singleBlog?.description || "-"),}} />
            </div>

          <div className={styles.line}></div>
          <ShareProfile {...{ singleBlog }} />
          {/* <CommonSection /> */}
          <div className={styles.recommendedTopalignment}>
            <Recommended />
          </div>
        </div>
      )}
    </>
  );
}

import { DateConvert, formatTitleCase } from "@/common";
import Accordion from "@/common/Accordion";
import LazyImage from "@/helpers/lazyImage";
import Recommended from "@/shared/components/recommended";
import { marked } from "marked";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import ShareProfile from "../../shareProfile";
import styles from "./blogInsideInformation.module.scss";
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
            <h1>{singleBlog?.title}</h1>
          </div>
          <div className={styles.personalInformation}>
            <div className={styles.profileInformation}>
              <div className={styles.img}>
                <LazyImage src={singleBlog?.uid?.profileImage ? singleBlog?.uid?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImage} />
              </div>
              <span>{formatTitleCase(singleBlog?.uid?.userName)}</span>
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
            <LazyImage src={singleBlog?.coverPhoto} alt={singleBlog?.coverPhotoAltTag ?? "Blog Cover Image"} />
          </div>
          <div className={styles.details}>
            <p>{singleBlog?.sortDescription}</p>
            <div dangerouslySetInnerHTML={{ __html: marked(singleBlog?.description || "-") }} />
          </div>
          {singleBlog?.FAQs?.length > 0 ? (
            <>
              <h2 className={styles.title}>Frequently Asked Questions</h2>
              <Accordion FAQs={singleBlog?.FAQs.map((item) => ({ ...item, isOpen: false }))} />
            </>
          ) : null}
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

import React, { useEffect, useState } from "react";
import styles from "./recommended.module.scss";
import WaveIcon from "@/assets/icons/waveIcon";
import LazyImage from "@/helpers/lazyImage";
import { ApiGet } from "@/helpers/API/ApiData";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import { DateConvert, GenerateDescription } from "@/common";
const CardImage = "/assets/images/latest-post.png";
const ProfileImage = "/assets/images/profile.png";
const BookmarkIcon = "/assets/icons/bookmark.svg";
const MinusIcon = "/assets/icons/minus.svg";
const MenuIcon = "/assets/icons/menu.svg";
export default function Recommended({ slugId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    getBlogData();
  }, [slugId]);

  const getBlogData = async () => {
    try {
        setIsLoading(true)
      const response = await ApiGet(`${slugId ?`blog-services/blogs/get?blogCategorySlugIds[0]=${slugId}` :"blog-services/blogs/get"}`);
      if (response?.data?.success) {
        setBlogData(response?.data?.payload?.blogs ?response?.data?.payload?.blogs :response?.data?.payload?.editor_blogs);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.recommendedSectionDesign}>
      <div className={styles.latestpostsTitle}>
        <h2>Recommended</h2>
        <WaveIcon />
      </div>
      <div className={styles.subBoxDesign}>
        <div className={styles.allCardDesign}>
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div className={styles.SkeletonCard} key={index}>
                    <div>
                      <Skeleton height={216} width={301} />
                    </div>
                    <div style={{ marginLeft: "25px" }}>
                      <div className={styles.alignImage}>
                        <Skeleton circle={true} height={34} width={34} />
                        <Skeleton style={{ marginLeft: "15px" }} width={275} />
                      </div>
                      <div style={{ marginTop: "25px" }}>
                        <Skeleton count={4} width={325} height={20} className={styles.alignImage} />
                      </div>
                    </div>
                  </div>
                ))
            : blogData?.map((data, i) => (
                <div className={styles.card} key={i}>
                  <div className={styles.cardImage}>
                    <Image height={216} width={301} src={data?.thumbnail} alt="CardImage" className={styles.cardImageStyle} />
                  </div>
                  <div>
                    <div className={styles.firstColumn}>
                      <div className={styles.leftContent}>
                        <div className={styles.profileImage}>
                        <Image src={data?.Users?.profileImage ? data?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                        </div>
                        <span>{data?.Users?.userName}</span>    
                      </div>
                      <ul>
                        <li>Trending</li>
                      </ul>
                      <ul>
                      <li>{DateConvert(data?.createdAt)}</li>
                      </ul>
                    </div>
                    <h3>{data?.title}</h3>
                    <p>{GenerateDescription(data?.description)}</p>
                    <div className={styles.iconAlignment}>
                      <img src={BookmarkIcon} alt="BookmarkIcon" width="100%" height="100%" />
                      <img src={MinusIcon} alt="MinusIcon" width="100%" height="100%" />
                      <img src={MenuIcon} alt="MenuIcon" width="100%" height="100%" />
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className={styles.loadMoreButton}>
          <button type="button" aria-label="Load More">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

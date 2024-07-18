import React, { useEffect, useState } from "react";
import styles from "./latestPosts.module.scss";
import Newsletter from "./newsletter";
import TagClouds from "./tagClouds";
import WaveIcon from "@/assets/icons/waveIcon";
import LazyImage from "@/helpers/lazyImage";
import Image from "next/image";
import { DateConvert } from "@/common";
import { useRouter } from "next/router";
import { getCookie } from "@/hooks/useCookie";
import toast from "react-hot-toast";
import { ApiPost } from "@/helpers/API/ApiData";
import { BookmarkIcon, UnBookmarkIcon } from "@/assets/icons/Icons";
const CardImage = "/assets/images/latest-post.png";
const ProfileImage = "/assets/images/profile.png";
// const BookmarkIcon = "/assets/icons/bookmark.png";
// const unBookmarkIcon = "/assets/icons/unbookmark.png";
const MinusIcon = "/assets/icons/minus.svg";
const MenuIcon = "/assets/icons/menu.svg";

export default function LatestPosts({ getBlogsData, onLoadMore, isLoadMoreDisabled, blogDataLoading, handleGetBlogsData, getBlogCategoryData }) {
  const router = useRouter();
  const [isUserSignOut, setIsUserSignOut] = useState(true);
  useEffect(() => {
    const userTokenFromCookie = getCookie("userToken");
    if (userTokenFromCookie !== undefined) {
      setIsUserSignOut(false);
    }
  }, []);

  const handleShowBlog = async (id) => {
    const userToken = getCookie("userToken");
    if (userToken == undefined) {
      toast.error("Please login to save to bookmark");
    } else {
      try {
        const resp = await ApiPost(`blog-services/blogs/saved-blogs?blogId=${id}`);
        if (resp?.data?.success) {
          toast.success(resp?.data?.message);
          handleGetBlogsData();
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      }
    }
  };
  return (
    <div className={styles.latestPostsContnetAlignment}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.gridItems}>
            <div className={styles.latestpostsTitle}>
              <h2>Latest Posts</h2>
              <WaveIcon />
            </div>
            <div className={styles.subBoxDesign}>
              <div className={styles.allCardDesign}>
                {getBlogsData?.slice(5, getBlogsData?.length)?.map((item, key) => {
                  return (
                    <div className={styles.card} key={key}>
                      <div className={styles.cardImage}>
                        <Image
                          src={item?.thumbnail}
                          style={{ cursor: "pointer" }}
                          onClick={() => router.push(`/blog/${item?.slugId}`)}
                          alt="CardImage"
                          height={216}
                          width={301}
                          className={styles.cardImageStyle}
                        />
                        {item?.isTrending ? (
                          <div className={styles.buttonDesign}>
                            <button>Trending</button>
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <div className={styles.firstColumn}>
                          <div className={styles.leftContent}>
                            <div className={styles.profileImage}>
                              <LazyImage src={item?.Users?.profileImage ? item?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                            </div>
                            <span>{item?.Users?.userName}</span>
                          </div>
                          {/* {item?.isTrending ? (
                            <ul>
                              <li>Trending</li>
                            </ul>
                          ) : null} */}
                          <ul>
                            <li>{DateConvert(item?.createdAt)}</li>
                          </ul>
                          <div className={styles.iconAlignment}>
                            <div onClick={() => handleShowBlog(item?._id)}>
                              {
                                isUserSignOut ? <UnBookmarkIcon /> :item ?.isSaved ?<BookmarkIcon /> :<UnBookmarkIcon />
                              }
                            </div>
                            
                            {/* <LazyImage onClick={() => handleShowBlog(item?._id)} src={ isUserSignOut ? unBookmarkIcon :item?.isSaved ? unBookmarkIcon : BookmarkIcon} alt="BookmarkIcon" width={23} height={25} /> */}

                            {/* <img src={MinusIcon} alt="MinusIcon" width="100%" height="100%" /> */}
                            {/* <img src={MenuIcon} alt="MenuIcon" width="100%" height="100%" /> */}
                          </div>
                        </div>
                        <h3 style={{ cursor: "pointer" }} onClick={() => router.push(`/blog/${item?.slugId}`)}>
                          {item?.title}
                        </h3>
                        <p>{item?.sortDescription ? item?.sortDescription : ""}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div className={styles.loadMoreButton}>
                <button type="button" aria-label="Load More">
                  Load More
                </button>
              </div> */}
              {!isLoadMoreDisabled && (
                <div className={styles.loadMoreButton}>
                  <button type="button" aria-label="Load More" onClick={onLoadMore} disabled={blogDataLoading}>
                    {blogDataLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.gridItems}>
            <div className={styles.stickyTop}>
              <Newsletter />
              <TagClouds getBlogCategoryData={getBlogCategoryData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

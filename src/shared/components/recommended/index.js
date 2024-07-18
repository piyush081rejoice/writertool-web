import React, { useEffect, useState } from "react";
import styles from "./recommended.module.scss";
import WaveIcon from "@/assets/icons/waveIcon";
import LazyImage from "@/helpers/lazyImage";
import { ApiGet, ApiPost } from "@/helpers/API/ApiData";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import { DateConvert, GenerateDescription } from "@/common";
import { useRouter } from "next/router";
import NoBlogFound from "../NoBlogFound";
import { getCookie } from "@/hooks/useCookie";
import { BookmarkIcon, UnBookmarkIcon } from "@/assets/icons/Icons";
const CardImage = "/assets/images/latest-post.png";
const ProfileImage = "/assets/images/profile.png";
// const BookmarkIcon = "/assets/icons/bookmark.png";
// const unBookmarkIcon = "/assets/icons/unbookmark.png";
const MinusIcon = "/assets/icons/minus.svg";
const MenuIcon = "/assets/icons/menu.svg";
export default function Recommended({ slugId, isSavedBlogs, differentName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [blogDataCount, setBlogDataCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isUserSignOut, setIsUserSignOut] = useState(true);
  useEffect(() => {
    const userTokenFromCookie = getCookie("userToken");
    if (userTokenFromCookie !== undefined) {
      setIsUserSignOut(false);
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    getBlogData();
  }, [slugId, limit, isSavedBlogs]);

  const handleShowBlog = async (id) => {
    const userToken = getCookie("userToken");
    if (userToken == undefined) {
      toast.error("Please login to save to bookmark");
    } else {
      try {
        const resp = await ApiPost(`blog-services/blogs/saved-blogs?blogId=${id}`);
        if (resp?.data?.success) {
          toast.success(resp?.data?.message);
          getBlogData();
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const getBlogData = async () => {
    try {
      setIsLoading(true);
      const response = await ApiGet(
        `${
          isSavedBlogs
            ? `blog-services/blogs/get-saved-blogs?limit=${limit}`
            : slugId
            ? slugId == "for-you"
              ? "blog-services/blogs/get-editor-blogs?isActive=true&limit=5"
              : `blog-services/blogs/get?blogCategorySlugIds[0]=${slugId}&isActive=true&limit=${limit}`
            : `blog-services/blogs/get?isActive=true&limit=${limit}`
        }`
      );
      if (response?.data?.success) {
        setBlogData(response?.data?.payload?.blogs ? response?.data?.payload?.blogs : response?.data?.payload?.editor_blogs);
        setBlogDataCount(response?.data?.payload?.counts);
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
        <h2>{differentName ? differentName : "Recommended"}</h2>
        <WaveIcon />
      </div>
      <div className={styles.subBoxDesign}>
        <div className={styles.allCardDesign}>
          {isLoading ? (
            Array(blogData?.length ?blogData?.length :4)
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
          ) : blogData?.length > 0 ? (
            blogData?.map((data, i) => (
              <div className={styles.card} key={i}>
                <div className={styles.cardImage}>
                  <Image
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/blog/${data?.slugId}`)}
                    height={216}
                    width={301}
                    src={data?.thumbnail}
                    alt="CardImage"
                    className={styles.cardImageStyle}
                  />
                  {data?.isTrending ? (
                    <div className={styles.buttonDesign}>
                      <button>Trending</button>
                    </div>
                  ) : null}
                </div>
                <div>
                  <div className={styles.firstColumn}>
                    <div className={styles.leftContent}>
                      <div className={styles.profileImage}>
                        <LazyImage src={data?.Users?.profileImage ? data?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                      </div>
                      <span style={{ fontSize: "10px" }}>{data?.Users?.userName}</span>
                    </div>
                    {/* {data?.isTrending ? <ul>
                        <li>Trending</li>
                      </ul> : null} */}

                    <ul>
                      <li>{DateConvert(data?.createdAt)}</li>
                    </ul>
                    <div className={styles.iconAlignment}>
                      <div onClick={() => handleShowBlog(data?._id)}>{isUserSignOut ? <UnBookmarkIcon /> : data?.isSaved ? <BookmarkIcon /> : <UnBookmarkIcon />}</div>
                      {/* <Image onClick={()=>handleShowBlog(data?._id)} src={isSavedBlogs ?unBookmarkIcon :  data?.isSaved ?  unBookmarkIcon : BookmarkIcon  } alt="BookmarkIcon" width={23} height={25} /> */}
                      {/* <img src={MinusIcon} alt="MinusIcon" width="100%" height="100%" />
                      <img src={MenuIcon} alt="MenuIcon" width="100%" height="100%" /> */}
                    </div>
                  </div>
                  <h3 onClick={() => router.push(`/blog/${data?.slugId}`)}>{data?.title}</h3>
                  <p className="texttruncatefourlines">{data?.sortDescription ? data?.sortDescription : ""}</p>
                </div>
              </div>
            ))
          ) : (
            <NoBlogFound />
          )}
        </div>
        {!(blogData?.length >= blogDataCount) ? (
          <div className={styles.loadMoreButton}>
            <button type="button" aria-label="Load More" onClick={() => setLimit((prev) => prev + 5)}>
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

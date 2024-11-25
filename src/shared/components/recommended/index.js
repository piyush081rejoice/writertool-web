import { BookmarkIcon, UnBookmarkIcon } from "@/assets/icons/Icons";
import WaveIcon from "@/assets/icons/waveIcon";
import { DateConvert, formatTitleCase } from "@/common";
import { ApiGet, ApiPost } from "@/helpers/API/ApiData";
import LazyImage from "@/helpers/lazyImage";
import { getCookie } from "@/hooks/useCookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import NoBlogFound from "../NoBlogFound";
import styles from "./recommended.module.scss";
import Link from "next/link";

const ProfileImage = "/assets/images/profile.png";

export default function Recommended({ slugId, isSavedBlogs, differentName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [blogDataCount, setBlogDataCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [userDetails, setUserDetails] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isUserSignOut, setIsUserSignOut] = useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  useEffect(() => {
    const localStorageUserData = localStorage.getItem("userData");
    if (localStorageUserData) {
      setUserDetails(JSON.parse(localStorageUserData));
    }
  }, []);

  useEffect(() => {
    const userTokenFromCookie = getCookie("userToken");
    if (userTokenFromCookie !== undefined) {
      setIsUserSignOut(false);
    }
  }, []);

  useEffect(() => {
    setLimit(5);
    setIsInitialLoad(true);
    getBlogData(5);
  }, [slugId, isSavedBlogs]);


  const handleShowBlog = async (id) => {
    const userToken = getCookie("userToken");
    if (userToken == undefined) {
      toast.error("Please login to save to bookmark");
    } else {
      try {
        const resp = await ApiPost(`blog-services/blogs/saved-blogs?blogId=${id}`);
        if (resp?.data?.success) {
          toast.success(resp?.data?.message);
          getBlogData(limit);
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const getBlogData = async (limit) => {
    try {
      setIsLoading(true);
      const response = await ApiGet(
        `${
          isSavedBlogs
            ? `blog-services/blogs/get-saved-blogs?limit=${limit}`
            : slugId
            ? slugId == "for-you"
              ? `blog-services/blogs/get-editor-blogs?isActive=true&limit=${limit}`
              : `blog-services/blogs/get?blogCategorySlugIds[0]=${slugId}&isActive=true&limit=${limit}`
            : `blog-services/blogs/get?isActive=true&limit=${limit}`
        }`
      );
      if (response?.data?.success) {
        setBlogData(response?.data?.payload?.blogs ? response?.data?.payload?.blogs : response?.data?.payload?.editor_blogs);
        setBlogDataCount(response?.data?.payload?.counts);
        setIsLoading(false);
        setIsInitialLoad(false);
        setIsLoadMoreLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      setIsLoading(false);
      setIsLoadMoreLoading(false);
    }
  };

  const handleLoadMore = () => {
    setIsLoadMoreLoading(true);
    const newLimit = limit + 5;
    setLimit(newLimit);
    getBlogData(newLimit);
  };

  return (
    <div className={styles.recommendedSectionDesign}>
      <div className={styles.latestpostsTitle}>
        <h2>{differentName ? differentName : "Recommended"}</h2>
        <WaveIcon />
      </div>
      <div className={styles.subBoxDesign}>
        <div className={styles.allCardDesign}>
          {isLoading && isInitialLoad ? (
            Array(blogData?.length ? blogData?.length : 4)
              .fill(0)
              .map((_, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.cardImage}>
                    <Skeleton height={216} />
                  </div>
                  <div>
                    <div className={styles.firstColumn}>
                      <div className={styles.leftContent}>
                        <div className={styles.profileImage}>
                          <Skeleton circle={true} height={34} width={34} />
                        </div>
                        <span>
                          <Skeleton width={140} height={18} />
                        </span>
                      </div>
                      <ul style={{paddingBottom:"20px"}}>
                        <li>
                          <Skeleton width={105} height={18} />
                        </li>
                      </ul>
                    </div>
                    <h3>
                      <Skeleton />
                    </h3>
                    <p className="texttruncatefourlines">
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </p>
                  </div>
                </div>
              ))
          ) : blogData?.length > 0 ? (
            blogData?.map((data, i) => (
              <div className={styles.card} key={i}>
                <div className={styles.cardImage}>
                  {data?.thumbnail ? (
                    <Link prefetch={false} href={`${data?.slugId}`}>
                      <LazyImage  src={data?.thumbnail} alt={data?.coverPhotoAltTag} className={styles.cardImageStyle} />
                    </Link>
                  ) : (
                    <Skeleton height={216} />
                  )}

                  {data?.isTrending ? (
                    <div className={styles.buttonDesign}>
                      <button>Trending</button>
                    </div>
                  ) : null}
                  {userDetails?._id != data?.uid ? (
                    <div className={styles.boookMarkIcon} onClick={() => handleShowBlog(data?._id)}>
                      {isUserSignOut ? <UnBookmarkIcon /> : isSavedBlogs ? <BookmarkIcon /> : data?.isSaved ? <BookmarkIcon /> : <UnBookmarkIcon />}
                    </div>
                  ) : null}
                </div>
                <div>
                  <div className={styles.firstColumn}>
                    <div className={styles.leftContent}>
                      <div className={styles.profileImage}>
                        <LazyImage src={data?.Users?.profileImage ? data?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                      </div>
                      <span>{formatTitleCase(data?.Users?.userName)}</span>
                    </div>
                    <ul>
                      <li>{DateConvert(data?.createdAt)}</li>
                    </ul>
                  </div>
                  <Link href={`/${data.slugId}`} prefetch={false}><h3>{data?.title}</h3></Link>
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
            <button type="button" aria-label="Load More" onClick={handleLoadMore} disabled={isLoadMoreLoading}>
              {isLoadMoreLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

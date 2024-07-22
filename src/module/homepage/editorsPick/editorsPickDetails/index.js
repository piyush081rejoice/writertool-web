import { DateConvert } from "@/common";
import Image from "next/image";
import Link from "next/link";
import styles from "./editorsPickDetails.module.scss";
import { useRouter } from "next/router";
import LazyImage from "@/helpers/lazyImage";
import { BookmarkIcon, UnBookmarkIcon } from "@/assets/icons/Icons";
import { getCookie } from "@/hooks/useCookie";
import toast from "react-hot-toast";
import { ApiPost } from "@/helpers/API/ApiData";
import { useEffect, useState } from "react";
const ProfileImage = "/assets/images/profile.png";
export default function EditorsPickDetails({ getBlogsData }) {
  const singleBlog = getBlogsData?.[0];
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [bookMarkIcon, setBookMarkIcon] = useState()

  useEffect(() => {
    const localStorageUserData = localStorage.getItem("userData");
    if (localStorageUserData) {
      setUserDetails(JSON.parse(localStorageUserData));
    }
  }, []);

  const [isUserSignOut, setIsUserSignOut] = useState(true);
  useEffect(() => {
    const userTokenFromCookie = getCookie("userToken");
    if (userTokenFromCookie !== undefined) {
      setIsUserSignOut(false);
    }
  }, []);
    
  useEffect(() => {
    if (isUserSignOut) {
      setBookMarkIcon(false);
    } else {
      if (singleBlog?.isSaved) {
        setBookMarkIcon(true);
      } else {
        setBookMarkIcon(false);
      }
    }
  }, [isUserSignOut, singleBlog]);

  const handleShowBlog = async (id) => {
    
    const userToken = getCookie("userToken");
    if (userToken == undefined) {
      toast.error("Please login to save to bookmark");
    } else {
      try {
        const resp = await ApiPost(`blog-services/blogs/saved-blogs?blogId=${id}`);
        if (resp?.data?.success) {
          toast.success(resp?.data?.message);
          setBookMarkIcon(!bookMarkIcon)
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      }
    }
  };
  return (
    <div className={styles.editorsPickDetails}>
      <div className={styles.imageStyle}>
        <Image
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/blog/${singleBlog?.slugId}`)}
          src={singleBlog?.thumbnail}
          alt="CardImage"
          height={250}
          width={320}
          className={styles.cardImage}
        />
        {singleBlog?.isTrending ? (
          <div className={styles.buttonDesign}>
            <button>Trending</button>
          </div>
        ) : null}
        {userDetails?._id != singleBlog?.uid ? (
          <div className={styles.boookMarkIcon}>
            <div onClick={() => handleShowBlog(singleBlog?._id)}>{bookMarkIcon ? <BookmarkIcon /> : <UnBookmarkIcon />}</div>
          </div>
        ) : null}
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.firstColumn}>
          <div className={styles.leftContent}>
            <div className={styles.profileImage}>
              <LazyImage src={singleBlog?.Users?.profileImage ? singleBlog?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
            </div>
            <span style={{ fontSize: "12px" }}>{singleBlog?.Users?.userName}</span>
          </div>
          <ul>
            <li>{DateConvert(singleBlog?.createdAt)}</li>
          </ul>
        </div>
        <Link href={`/blog/${singleBlog?.slugId}`}>
          <h3>{singleBlog?.title}</h3>
        </Link>
        <p className={"texttruncatesixlines"}>{singleBlog?.sortDescription ? singleBlog?.sortDescription : ""}</p>
      </div>
    </div>
  );
}

import { DateConvert } from "@/common";
import { ApiGet } from "@/helpers/API/ApiData";
import CommonSection from "@/shared/components/commonSection";

import Recommended from "@/shared/components/recommended";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShareProfile from "../../shareProfile";
import styles from "./blogInsideInformation.module.scss";
import Skeleton from "react-loading-skeleton";
const ProfileImage = "/assets/images/profile.png";
import {marked} from "marked"
export default function BlogInsideInformation({ slugId }) {
  
  const [blogIsLoading, setBlogIsLoading] = useState(false);
  useEffect(() => {
    if (blogIsLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [blogIsLoading])

  const [singleBlog, setSingleBlog] = useState();
  useEffect(() => {
    if(slugId){
    handleIsTrendingData();}
  }, [slugId]);
  const handleIsTrendingData = async () => {
    try {
      setBlogIsLoading(true);
      const response = await ApiGet(`blog-services/blogs/get?slugId=${slugId}`);
      if (response?.data?.success) {
        const data = response?.data?.payload?.blogs;
        setSingleBlog(data);
        setBlogIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      setBlogIsLoading(false);
    }
  };

  return (
    <>
      {blogIsLoading ? (
        <div style={{marginTop:"25px"}}> 
          <Skeleton height={30} width={775} />
          <Skeleton style={{marginTop:"25px"}} height={30} width={775} />
          <Skeleton style={{marginTop:"25px"}}  height={600} width={775} />
        </div>
      ) : (
        <div className={styles.blogInsideInformation}>
          <div className={styles.title}>
            <h2>{singleBlog?.title}</h2>
          </div>
          <div className={styles.personalInformation}>
            <div className={styles.profileInformation}>
              <div className={styles.img}>
                <Image src={singleBlog?.uid?.profileImage ? singleBlog?.uid?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImage} />
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
            <Image height={496} width={775} src={singleBlog?.coverPhoto} alt="BlogImage" className={styles.profileImage} />
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

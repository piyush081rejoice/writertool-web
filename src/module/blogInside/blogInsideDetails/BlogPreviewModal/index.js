import { formatTitleCase, getCurrentFormattedDate } from "@/common";
import LazyImage from "@/helpers/lazyImage";
import { marked } from "marked";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./BlogPreviewModal.module.scss";
import { FacebookWhiteIcon, InstagramWhiteIcon, LinkedinWhiteIcon, TwitterWhiteIcon, YoutubeWhiteIcon } from "@/assets/icons/Icons";
import FacebookIcon from "@/assets/icons/facebookIcon";
import TwitterIcon from "@/assets/icons/twitterIcon";
import LinkdinIcon from "@/assets/icons/linkdinIcon";
import InstagramIcon from "@/assets/icons/Instagram";
import YouTubeIcon from "@/assets/icons/YoutubeIcon";
import ShareProfile from "../../shareProfile";
const ProfileImage = "/assets/images/profile.png";
const Leftarrow = "/assets/icons/leftarrow.svg";
const ProfileLg = '/assets/images/userWhite.png';
export default function BlogPreviewModal({ singleBlog, setPreviewModal ,editorValue ,coverPhotoPreview }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem("userData"));
    if (currentUserData) {
      let currentUser = {
        profileImage: currentUserData?.profileImage,
        userName: currentUserData?.userName,
        shortBio: currentUserData?.shortBio,
        facebookLink: currentUserData?.facebookLink,
        twitterLink: currentUserData?.twitterLink,
        linkedinLink: currentUserData?.linkedinLink,
        instagramLink: currentUserData?.instagramLink,
        youtubeLink: currentUserData?.youtubeLink,
      };
      setUserData(currentUser);
    }
  }, []);
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
          <div className={styles.skipText} onClick={() => setPreviewModal(false)}>
            <div className={styles.buttonAlignment}>
              <button onClick={() => setPreviewModal(false)}>
                <span>
                  <img src={Leftarrow} alt="Leftarrow" width="100%" height="100%" />
                  Back
                </span>
              </button>{" "}
            </div>
            {/*  */}
          </div>
          <div style={{ marginTop: "20px" }} className={styles.title}>
            <h2>{singleBlog?.title}</h2>
          </div>
          <div className={styles.personalInformation}>
            <div className={styles.profileInformation}>
              <div className={styles.img}>
                <LazyImage src={userData?.profileImage ? userData?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImage} />
              </div>
              <span>{formatTitleCase(userData?.userName)}</span>
            </div>
            {singleBlog?.isTrending ? (
              <ul>
                <li>Trending</li>
              </ul>
            ) : null}
            <ul>
              <li>{getCurrentFormattedDate()}</li>
            </ul>
          </div>
          <div className={styles.blogImage}>
            <LazyImage src={coverPhotoPreview} alt="BlogImage" />
          </div>
          <div className={styles.details}>
            <p>{singleBlog?.sortDescription}</p>
            <div dangerouslySetInnerHTML={{ __html: marked(editorValue || "-") }} />
          </div>
          <div className={styles.line}></div>
          
          <div className={styles.shareProfileAllContnet}>
            <div className={styles.firstColumnAlignment}>
                {
                    singleBlog?.facebookLink ||  singleBlog?.twitterLink ||  singleBlog?.linkedinLink || singleBlog?.instagramLink || singleBlog?.youtubeLink ?  
                    <div className={styles.leftContent}>
                    <span>Share this:</span>
                    <div className={styles.socialIconAlignment}>
                        {singleBlog?.facebookLink ? <span onClick={()=>handleLinkClick(singleBlog?.facebookLink)}><FacebookIcon /></span> : null}
                        {singleBlog?.twitterLink ? <span onClick={()=>handleLinkClick(singleBlog?.twitterLink)}><TwitterIcon /></span> : null}
                        {singleBlog?.linkedinLink ? <span onClick={()=>handleLinkClick(singleBlog?.linkedinLink)}><LinkdinIcon /></span> : null}
                        {singleBlog?.instagramLink ? <span onClick={()=>handleLinkClick(singleBlog?.instagramLink)}><InstagramIcon/></span> : null}
                        {singleBlog?.youtubeLink ? <span onClick={()=>handleLinkClick(singleBlog?.youtubeLink)}><YouTubeIcon /></span> : null} 
                    </div>
                </div>
                    :null
                }
                <div className={styles.buttonFlex}>
                    {
                        singleBlog?.keyWords?.length >0  ?  singleBlog?.keyWords?.map((data,index)=> <button type='button' key={index} > #{data} </button>)  : null
                    }
                </div>
            </div>
            <div className={styles.profileBox}>
                <div className={styles.profile}>
                <LazyImage src={userData?.profileImage ? userData?.profileImage : ProfileLg} alt="ProfileImage" height={90} width={90} className={styles.profileImage} />
                </div>
                <div>
                    <h3>{formatTitleCase(userData?.userName)}</h3>
                    {
                        userData?.shortBio ? <p>{userData?.shortBio} </p> : null
                    }
                    
                    <div className={styles.icons}>
                       {userData?.facebookLink ? <span onClick={()=>handleLinkClick(userData?.facebookLink)}><FacebookWhiteIcon /></span> : null}
                       {userData?.twitterLink ? <span onClick={()=>handleLinkClick(userData?.twitterLink)}><TwitterWhiteIcon /></span> : null}
                       {userData?.linkedinLink ? <span onClick={()=>handleLinkClick(userData?.linkedinLink)}><LinkedinWhiteIcon /></span> : null}
                       {userData?.instagramLink ? <span onClick={()=>handleLinkClick(userData?.instagramLink)}><InstagramWhiteIcon /></span> : null}
                       {userData?.youtubeLink ? <span onClick={()=>handleLinkClick(userData?.youtubeLink)}><YoutubeWhiteIcon /></span> : null}
                    </div>
                </div>
            </div>
        </div>
        </div>
      )}
    </>
  );
}

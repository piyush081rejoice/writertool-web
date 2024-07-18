import CloseIcon from "@/assets/icons/closeIcon";
import LibraryIcon from "@/assets/icons/libraryIcon";
import LogoutIcon from "@/assets/icons/logoutIcon";
import ProfileIcon from "@/assets/icons/profileIcon";
import StoriesIcon from "@/assets/icons/storiesIcon";
import { getCookie } from "@/hooks/useCookie";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import LogoutModal from "../logoutModal";
import styles from "./profileSidebar.module.scss";
const WriterTools = "/assets/logo/logo.svg";
export default function ProfileSidebar(props) {
  const { sidebar, setSidebar } = props;
  const [updateProfile, setUpdateProfile] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const router = useRouter();
  

  const navigateBlog = (redirectPath) => {
    const userLogin = getCookie("userToken");
    if (userLogin != undefined) {
      router.push(redirectPath);
      setSidebar(!sidebar);
    } else {
      router.push("/sign-in");
      setSidebar(!sidebar);
    }
  };
  return (
    <>
      <div>
        {sidebar && <div className={styles.profileblur}></div>}
        <div  className={classNames(styles.profileSidebar, sidebar ? styles.show : styles.hide)}>
          <div className={styles.closeIconRightAlignment} onClick={() => setSidebar(false)}>
            <CloseIcon />
          </div>
          <div className={styles.logo}>
            <img src={WriterTools} alt="WriterTools" width="100%" height="100%" />
          </div>
          <div className={styles.allIconsAlignment}>
            <div className={styles.iconText} onClick={() => navigateBlog("/profile-setting")}>
              <ProfileIcon />
              <span>Profile</span>
            </div>
            <div className={styles.iconText} onClick={() => navigateBlog("/your-stories")}>
              <StoriesIcon />
              <span>Your Blogs</span>
            </div>
            <div className={styles.iconText} onClick={() => navigateBlog("/library")}>
              <LibraryIcon />
              <span>Library</span>
            </div>
            <div className={styles.iconText} onClick={() => setIsDeleteModal(true)}>
              <LogoutIcon />
              <span>Sign out</span>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModal && <LogoutModal setIsDeleteModal={setIsDeleteModal} setSidebar={setSidebar} />}
    </>
  );
}

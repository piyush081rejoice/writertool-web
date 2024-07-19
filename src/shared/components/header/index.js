import UserIcon from "@/assets/icons/userIcon";
import WriteIcon from "@/assets/icons/writeIcon";
import LazyImage from "@/helpers/lazyImage";
import { getCookie, setCookie } from "@/hooks/useCookie";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileSidebar from "../profileSidebar";
import styles from "./header.module.scss";
const WriterTools = "/assets/logo/logo.svg";
const NotificationIcon = "/assets/icons/notification.svg";
const ProfileImage = "/assets/images/headerUser.jpg";
const NotificationImage = "/assets/images/notification.svg";
const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [notification, setNotification] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const handleWriteBlog = () => {
    const userLogin = getCookie("userToken");
    if (userLogin !== undefined) {
      router.push("/write-blog");
    } else {
      router.push("/sign-in");
      setCookie("redirectUrl", "/write-blog");
    }
  };
  useEffect(() => {
    const userEmail = getCookie("userToken");
    if (userEmail == undefined) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  }, [getCookie("userToken")]);

  const updateUserData = () => {
    const localStorageUserData = localStorage.getItem("userData");
    if (localStorageUserData) {
      setUserDetails(JSON.parse(localStorageUserData));
    }
  };

  useEffect(() => {
    updateUserData();

    window.addEventListener("localStorageUpdate", updateUserData);

    return () => {
      window.removeEventListener("localStorageUpdate", updateUserData);
    };
  }, [getCookie("userToken")]);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerAlignment}>
            <div className={styles.logo}>
              <Link href="/">
                <LazyImage src={WriterTools} alt="WriterTools" width="100%" height="100%" />
              </Link>
            </div>
            <div className={styles.rightAllContent}>
              <button className={styles.fill} onClick={() => router.push("/category")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0.78125C8.17671 0.78125 6.39436 1.32192 4.87834 2.33489C3.36233 3.34786 2.18074 4.78763 1.48299 6.47214C0.785244 8.15664 0.602682 10.0102 0.95839 11.7985C1.3141 13.5868 2.1921 15.2294 3.48136 16.5186C4.77063 17.8079 6.41325 18.6859 8.20152 19.0416C9.98978 19.3973 11.8434 19.2148 13.5279 18.517C15.2124 17.8193 16.6521 16.6377 17.6651 15.1217C18.6781 13.6056 19.2188 11.8233 19.2188 10C19.2159 7.5559 18.2438 5.21271 16.5155 3.48446C14.7873 1.75622 12.4441 0.784062 10 0.78125ZM10 18.2812C8.36213 18.2812 6.76103 17.7956 5.39919 16.8856C4.03734 15.9757 2.97591 14.6823 2.34913 13.1691C1.72234 11.6559 1.55834 9.99081 1.87788 8.38441C2.19741 6.778 2.98612 5.30242 4.14428 4.14427C5.30243 2.98612 6.77801 2.19741 8.38441 1.87787C9.99082 1.55834 11.6559 1.72233 13.1691 2.34912C14.6823 2.97591 15.9757 4.03734 16.8856 5.39918C17.7956 6.76103 18.2813 8.36212 18.2813 10C18.2788 12.1956 17.4055 14.3005 15.853 15.853C14.3005 17.4055 12.1956 18.2788 10 18.2812Z" fill="#fff"/>
<path d="M14.1498 5.20078L8.21118 7.99515C8.11218 8.0419 8.03256 8.12168 7.98602 8.22078L5.22586 14.125C5.18502 14.2122 5.17205 14.3099 5.1887 14.4048C5.20535 14.4997 5.25083 14.5871 5.31893 14.6552C5.38704 14.7233 5.47448 14.7688 5.56935 14.7854C5.66422 14.8021 5.76191 14.7891 5.84915 14.7483L11.7537 11.9883C11.8528 11.9417 11.9326 11.8621 11.9793 11.7631L14.7735 5.82453C14.8088 5.74646 14.8225 5.66038 14.8133 5.57521C14.8041 5.49004 14.7723 5.40888 14.7212 5.34015C14.6541 5.25781 14.562 5.19963 14.4589 5.17447C14.3557 5.14931 14.2472 5.15855 14.1498 5.20078ZM6.62227 13.3522L8.55227 9.22359L10.7507 11.4219L6.62227 13.3522ZM11.4149 10.7605L9.21383 8.55953L13.3701 6.60343L11.4149 10.7605Z" fill="#fff"/>
</svg>

                Explore Blogs
              </button>
              <button className={styles.fill} onClick={handleWriteBlog}>
                <WriteIcon />
                Write
              </button>

              {!userLoggedIn && (
                <button onClick={() => router.push("/sign-in")} className={styles.outline}>
                  <UserIcon />
                  Sign In
                </button>
              )}
              <div className={styles.relativeDiv}>
                <div className={styles.notificationIcon}>
                  {/* <Link href="/notifications"> */}
                  <img width="100%" height="100%" src={NotificationIcon} alt="NotificationIcon" onClick={() => setNotification(!notification)} />
                  {/* </Link>dd */}
                </div>
                <div className={classNames(styles.dropdownNotification, notification ? styles.show : styles.hide)}>
                  <div className={styles.spacer}>
                    <h2>Recent Notification</h2>
                    <div className={styles.allnotificationAlignment}>
                      {[...Array(10)].map(() => {
                        return (
                          <div className={styles.nofiticationGrid}>
                            <img src={NotificationImage} alt="NotificationImage" width="100%" height="100%" />
                            <div>
                              <p>
                                <span>HTCustomerStudio</span> started following you.
                              </p>
                              <h6>Apr 11, 2024</h6>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {userLoggedIn && (
                <div className={styles.profileImage} onClick={() => setSidebar(!sidebar)}>
                  {/* <img width="100%" height="100%" src={userDetailsprofileImage VectoreIcon} alt="VectoreIcon" /> */}
                  <img src={userDetails?.profileImage ? userDetails?.profileImage : ProfileImage} alt="VectoreIcon" className={styles.userLogo} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <ProfileSidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div className={styles.notificationLayer}></div>
    </>
  );
};

export default Header;

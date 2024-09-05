import UserIcon from "@/assets/icons/userIcon";
import WriteIcon from "@/assets/icons/writeIcon";
import LazyImage from "@/helpers/lazyImage";
import { getCookie, setCookie } from "@/hooks/useCookie";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ProfileSidebar from "../profileSidebar";
import styles from "./header.module.scss";
import { getSocket } from "@/socket";
import { DateConvert, replaceQuotedTextWithSpan } from "@/common";
import Button from "../button";
import OnClickOutside from "@/hooks/useClickOutside";
import { ExploreBlogs, ExploreTopic, WriteBlogs } from "@/assets/icons/Icons";
import Explore from "@/assets/icons/Explore";
import ProfileIcon from "@/assets/icons/profileIcon";
import StoriesIcon from "@/assets/icons/storiesIcon";
import LibraryIcon from "@/assets/icons/libraryIcon";
import LogoutIcon from "@/assets/icons/logoutIcon";
import LogoutModal from "../logoutModal";
import useScreenSize from "@/hooks/useScreenSize";
const WriterTools = "/assets/logo/logo.svg";
const NotificationIcon = "/assets/icons/notification.svg";
const ProfileImage = "/assets/images/headerUser.jpg";
const NotificationImage = "/assets/logo/App_Icon.png";
const Header = () => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [headerOpen, setHeaderOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [mobileNotification, setMobileNotification] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [unreadNotification, setUnreadNotification] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const recentNotificationRef = useRef(null);
  const toggleDropDown = () => setNotification(false);
  OnClickOutside([recentNotificationRef], toggleDropDown);
  const recentNotificationMobileRef = useRef(null);
  const toggleMobileDropDown = () => setMobileNotification(false);
  OnClickOutside([recentNotificationMobileRef], toggleMobileDropDown);
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
    if (headerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [headerOpen]);


  const handleNavigate =(redirectPath)=>{
    router.push(redirectPath);
    setHeaderOpen(!headerOpen)
  }

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

  useEffect(() => {
    updateUserData();

    window.addEventListener("localStorageUpdate", updateUserData);

    return () => {
      window.removeEventListener("localStorageUpdate", updateUserData);
    };
  }, [getCookie("userToken")]);
  const socket = getSocket();
  const isMobile = useScreenSize();
  const updateNotificationNumber = () => {

    if (socket) {
      socket.emit("update-notification", {});
    }
    if (isMobile) {
      setMobileNotification(!mobileNotification)
    }else{
      setNotification(!notification);
    }
  };
  const handleMoreNotifications = () => {
    router.push("/notifications");
    if (isMobile) {
      setMobileNotification(!mobileNotification)
    }else{
      setNotification(!notification);
    }
  };
  useEffect(() => {
    if (socket) {
      // socket.on("connect", () => {
      //   console.log("socket.id", socket); // x8WIv7-mJelg7on_ALbx
      //   socket.emit("get-unreadNotification-counts", {});
      // });

      if (socket.connected) {
        socket.emit("get-unreadNotification-counts", {});
        socket.emit("check-notification", {});
      } else {
        console.log("Socket is not connected");
      }
      socket.on("get-unreadNotification-counts", (data) => {
        setNotificationNumber(data.counts);
      });
      socket.on("check-notification", (data) => {
        setUnreadNotification(data?.unreadNotification || []);
      });
      socket.on("error", (error) => {
        console.error("Socket connection error:", error);
      });
    }
  }, [socket]);

  const handleMarkAllAsRead = () => {
    socket.emit("update-notification", { isRead: true });
    if (isMobile) {
      setMobileNotification(!mobileNotification)
    }else{
      setNotification(!notification);
    }  };
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
                <ExploreBlogs />
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
              {userLoggedIn && (
                <div ref={recentNotificationRef} className={styles.relativeDiv}>
                  <div className={styles.notificationIcon}>
                    {notificationNumber > 0 && (
                      <span className={styles.notificationBadge}>
                        <p>{notificationNumber}</p>
                      </span>
                    )}
                    <LazyImage width="100%" height="100%" src={NotificationIcon} alt="NotificationIcon" onClick={updateNotificationNumber} />
                  </div>
                  <div className={classNames(styles.dropdownNotification, notification ? styles.show : styles.hide)}>
                    <div className={styles.spacer}>
                      <h2>Recent Notification</h2>
                      <div className={styles.allnotificationAlignment}>
                        {unreadNotification?.length > 0 ? (
                          <>
                            {unreadNotification?.map((data, index) => {
                              return (
                                <div className={styles.nofiticationGrid} key={index}>
                                  <img src={NotificationImage} alt="NotificationImage" width="100%" height="100%" />
                                  <div>
                                    <p dangerouslySetInnerHTML={{ __html: replaceQuotedTextWithSpan(data?.message) }}></p>
                                    <h6>{DateConvert(data?.createdAt)}</h6>
                                  </div>
                                </div>
                              );
                            })}
                            <div className={styles.Marknotificationbuttonsmain}>
                              <Button onClick={handleMoreNotifications} text={"More Notifications"} />
                              <Button onClick={handleMarkAllAsRead} text={"Mark All As Read"} />
                            </div>
                          </>
                        ) : (
                          <div>No new notifications are available at this time.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {userLoggedIn && (
                <div className={styles.profileImage} onClick={() => setSidebar(!sidebar)}>
                  {/* <img width="100%" height="100%" src={userDetailsprofileImage VectoreIcon} alt="VectoreIcon" /> */}
                  <img src={userDetails?.profileImage ? userDetails?.profileImage : ProfileImage} alt="VectoreIcon" className={styles.userLogo} />
                </div>
              )}
            </div>
            <div className={styles.menuIcon} >
           {
            userLoggedIn ? <div ref={recentNotificationMobileRef} className={styles.relativeDiv}>
            <div className={styles.notificationIcon}>
              {notificationNumber > 0 && (
                <span className={styles.notificationBadge}>
                  <p>{notificationNumber}</p>
                </span>
              )}
              <LazyImage width="100%" height="100%" src={NotificationIcon} alt="NotificationIcon" onClick={updateNotificationNumber} />
            </div>
            <div className={classNames(styles.dropdownNotification, mobileNotification ? styles.show : styles.hide)}>
              <div className={styles.spacer}>
                <h2>Recent Notification</h2>
                <div className={styles.allnotificationAlignment}>
                  {unreadNotification?.length > 0 ? (
                    <>
                      {unreadNotification?.map((data, index) => {
                        return (
                          <div className={styles.nofiticationGrid} key={index}>
                            <img src={NotificationImage} alt="NotificationImage" width="100%" height="100%" />
                            <div>
                              <p dangerouslySetInnerHTML={{ __html: replaceQuotedTextWithSpan(data?.message) }}></p>
                              <h6>{DateConvert(data?.createdAt)}</h6>
                            </div>
                          </div>
                        );
                      })}
                      <div className={styles.Marknotificationbuttonsmain}>
                        <Button onClick={handleMoreNotifications} text={"More Notifications"} />
                        <Button onClick={handleMarkAllAsRead} text={"Mark All As Read"} />
                      </div>
                    </>
                  ) : (
                    <div>No new notifications are available at this time.</div>
                  )}
                </div>
              </div>
            </div>
          </div> :null
           }
                 
                <svg onClick={() => setHeaderOpen(!headerOpen)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      <ProfileSidebar sidebar={sidebar} setSidebar={setSidebar} setIsDeleteModal={setIsDeleteModal} navigateBlog={navigateBlog} />
      <div className={styles.notificationLayer}></div>
      <div className={classNames(styles.mobileSidebar, headerOpen ? styles.show : styles.hide)}>
        <div className={styles.mobileSidebarHeader}>
          <div className={styles.logo}>
            <Link aria-label="Redirect to Home page" href="/">
              <LazyImage src={WriterTools} alt="WriterTools" width="100%" height="100%" />
            </Link>
          </div>
          <div className={styles.closeIcon} onClick={() => setHeaderOpen(!headerOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        </div>
        <div className={styles.mobileSidebarbody}>
          <div className={styles.sidebarMenu} onClick={() => handleNavigate("/category") }><ExploreTopic/> <span>Explore Blogs</span></div>
          <div className={styles.sidebarMenu} onClick={() =>{handleWriteBlog();setHeaderOpen(!headerOpen);}}><WriteBlogs/><span>Write Blog</span></div>
          {userLoggedIn ? (
            <>
              <div className={styles.sidebarMenu} onClick={() => handleNavigate("/profile-setting")}><ProfileIcon /><span>Profile</span></div>
              <div className={styles.sidebarMenu} onClick={() => handleNavigate("/your-stories")}><StoriesIcon /><span>Your Blogs</span></div>
              <div className={styles.sidebarMenu} onClick={() => handleNavigate("/library")}><LibraryIcon /><span>Library</span></div>
              <div className={styles.sidebarMenu} onClick={() => setIsDeleteModal(true)}><LogoutIcon /><span>Sign out</span></div>
            </>
          ) : (
            <div className={styles.sidebarMenu} onClick={()=> {handleNavigate("/sign-in");setHeaderOpen(!headerOpen);}} ><UserIcon /><span>Sign In</span></div>
          )}
        </div>
      </div>
      {isDeleteModal && <LogoutModal  setHeaderOpen={setHeaderOpen} setIsDeleteModal={setIsDeleteModal} setSidebar={setSidebar} />}
    </>
  );
};

export default Header;
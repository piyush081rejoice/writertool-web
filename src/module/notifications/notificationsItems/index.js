import { DateConvert, replaceQuotedTextWithSpan } from "@/common";
import { ApiGet } from "@/helpers/API/ApiData";
import LazyImage from "@/helpers/lazyImage";
import NoNotification from "@/shared/components/NoBlogFound/NoNotification";
import Pagination from "@/shared/components/pagination/pagination";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import styles from "./notificationsItems.module.scss";
const NotificationsImage = "/assets/logo/App_Icon.png";

export default function NotificationsItems() {
  const [pagination, setPagination] = useState(1);
  const [notificationsCounts, setNotificationsCounts] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);
  useEffect(() => {
    handleGetNotification();
  }, [pagination]);

  const handleGetNotification = async () => {
    try {
      setIsLoading(true);
      const response = await ApiGet(`user-services/user/get-notification?page=${pagination}`);
      const data = response?.data;
      if (data?.success) {
        setIsLoading(false);
        setNotifications(data?.payload?.data);
        setNotificationsCounts(data?.payload?.count);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.notificationsItems}>
      <div className={styles.allNotificationBoxAlignment}>
        {isLoading ? (
          <>
            {[...Array(12)]?.map((_, index) => (
              <div className={styles.notificationSkeleton} key={index}>
                <div className={styles.img}>
                  <Skeleton circle height={47} className={styles.notificationsImage} />
                </div>
                <div>
                  <Skeleton count={1} height={18} width={`60%`} />
                  <Skeleton count={1} width={200} style={{ marginTop: "5px" }} />
                </div>
              </div>
            ))}
          </>
        ) : notifications.length > 0 ? (
          <>
            {notifications.map((data, index) => (
              <div key={index} className={styles.notificationGrid}>
                <div className={styles.img}>
                  <LazyImage src={NotificationsImage} alt={"NotificationsImage"} className={styles.notificationsImage} />
                </div>
                <div>
                  <p dangerouslySetInnerHTML={{ __html: replaceQuotedTextWithSpan(data?.message) }}></p>

                  <span className={styles.date}>{DateConvert(data?.createdAt)}</span>
                </div>
              </div>
            ))}
            {
              notificationsCounts > 10 ? <Pagination pages={Math.ceil(notificationsCounts /10)} current={pagination} onClick={setPagination} /> :null
            }
          </>
        ) : (
          <NoNotification />
        )}
      </div>
      {/* <div className={styles.boxFooteralignment}>
                <button>
                Older Notifications
                </button>
                <span>Your Stats</span>
            </div> */}
    </div>
  );
}

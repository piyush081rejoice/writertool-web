import Breadcrumb from "../writeBlog/breadcrumb";
import NotificationsDetails from "./notificationsDetails";
export default function Notifications({isTrendingBlogsData ,getBlogCategoryData}) {
  return (
    <>
      <Breadcrumb dynamicList={"Notification"} />
      {/* <div className="container">
        <div className={styles.notificationsbreadcumbalignment}>
          <span>Writertools</span>
          <span>/</span>
          <span>Notification</span>
        </div>
      </div> */}
      <NotificationsDetails getBlogCategoryData={getBlogCategoryData} isTrendingBlogsData={isTrendingBlogsData} />
    </>
  );
}

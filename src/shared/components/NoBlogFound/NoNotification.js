import LazyImage from "@/helpers/lazyImage";
import { useRouter } from "next/router";
import styles from "./NoBlogFound.module.scss";

const NoBlogFoundImage = "/assets/images/NoBlogFound.png";
const NoNotification = () => {
  const router = useRouter();
  return (
    <div className={styles.mainDiv}>
      <LazyImage className={styles.NoNotification} alt="NoNotification" src={NoBlogFoundImage} width={194} height={156} />
      <h2 className={styles.NoNotificationHeading}>No Notifications Available</h2>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Go to Back
      </button>
    </div>
  );
};

export default NoNotification;

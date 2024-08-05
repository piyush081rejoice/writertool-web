import { formatTitleCase } from "@/common";
import styles from "./categoryTopbar.module.scss";
export default function CategoryTopbar({ slugId }) {
  return (
    <div className={styles.categoryTopbar}>
      <div className="container">
        <h1>{slugId ? formatTitleCase(slugId) : "Explore Topics"}</h1>
      </div>
    </div>
  );
}

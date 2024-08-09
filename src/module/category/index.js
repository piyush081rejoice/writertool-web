import Tab from "@/shared/components/tab";
import styles from "./category.module.scss";
import CategoryInformation from "./categoryInformation";
import CategoryTopbar from "./categoryTopbar";


export default function Category({ isTrendingBlogsData, getBlogCategoryData, slugId }) {
  return (
    <div>
      {/* <div className={styles.tabSpacer}>
        <Tab {...{ getBlogCategoryData }} />
      </div> */}
      <CategoryTopbar {...{ slugId }} />
      <CategoryInformation {...{ slugId, isTrendingBlogsData }} />
    </div>
  );
}

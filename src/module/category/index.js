import React, { useState } from "react";
import styles from "./category.module.scss";
import Tab from "@/shared/components/tab";
import CategoryTopbar from "./categoryTopbar";
import CategoryInformation from "./categoryInformation";
export default function Category({ isTrendingBlogsData, getBlogCategoryData, slugId }) {
  const [isActive, setIsActive] = useState("ALL");

  const handleOnSelect = (item) => {
    setIsActive(item);
  };

  return (
    <div>
      <div className={styles.tabSpacer}>
        <Tab {...{ getBlogCategoryData,handleOnSelect,isActive }} />
      </div>
      <CategoryTopbar {...{ slugId }} />
      <CategoryInformation {...{ slugId, isTrendingBlogsData }} />
    </div>
  );
}

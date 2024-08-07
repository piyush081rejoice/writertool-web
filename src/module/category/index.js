import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./category.module.scss";
const Tab = dynamic(() => import("@/shared/components/tab"));
const CategoryTopbar = dynamic(() => import("./categoryTopbar"));
const CategoryInformation = dynamic(() => import("./categoryInformation"));

export default function Category({ isTrendingBlogsData, getBlogCategoryData, slugId }) {
  return (
    <div>
      <div className={styles.tabSpacer}>
        <Tab {...{ getBlogCategoryData }} />
      </div>
      <CategoryTopbar {...{ slugId }} />
      <CategoryInformation {...{ slugId, isTrendingBlogsData }} />
    </div>
  );
}

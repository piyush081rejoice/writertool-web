import React from "react";
import styles from "./breadcrumb.module.scss";
import { useRouter } from "next/router";
import { formatTitleCase } from "@/common";
export default function Breadcrumb({ dynamicList, categoryData }) {
  const router = useRouter();
  return (
    <div className={styles.breadcrumbAllContentAlignment}>
      <div className="container">
        <div className={styles.contentAlignment}>
          <span className={styles.cursor} onClick={() => router.push("/")}>
            Writertools
          </span>
          <span>/</span>
          {categoryData ? (
            <>
              <span className={styles.cursor} onClick={() => router.push(`/category/${categoryData?.slugId}`)}>
                {formatTitleCase(categoryData?.slugId)}
              </span>
              <span>/</span>
            </>
          ) : null}

          <h4 className={styles.tittle}>{dynamicList}</h4>
        </div>
      </div>
    </div>
  );
}

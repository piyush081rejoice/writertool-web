import React from "react";
import styles from "./breadcrumb.module.scss";
import { useRouter } from "next/router";
export default function Breadcrumb({ dynamicList }) {
  const router = useRouter();
  return (
    <div className={styles.breadcrumbAllContentAlignment}>
      <div className="container">
        <div className={styles.contentAlignment}>
          <span className={styles.cursor} onClick={() => router.push("/")}>
            Writertools{" "}
          </span>
          <span>/</span>
          <h4 className={styles.tittle}>{dynamicList}</h4>
        </div>
      </div>
    </div>
  );
}

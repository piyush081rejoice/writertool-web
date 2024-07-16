import React from "react";
import styles from "./tagClouds.module.scss";
import WaveIcon from "@/assets/icons/waveIcon";
export default function TagClouds({ getBlogCategoryData }) {
  return (
    <div className={styles.tagCloudsBox}>
      <div className={styles.boxTitle}>
        <h2>Tag Clouds</h2>
        <div className={styles.iconCenter}>
          <WaveIcon />
        </div>
      </div>
      <div className={styles.buttonFlex}>
        {getBlogCategoryData?.length > 0
          ? getBlogCategoryData?.map((data, index) => (
              <button key={index} type="button" aria-label={`#${data?.title}`}>
                #{data?.title}
              </button>
            ))
          :<div>Not found  Tag Clouds</div> }
      </div>
    </div>
  );
}

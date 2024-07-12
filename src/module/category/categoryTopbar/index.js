import React from "react";
import styles from "./categoryTopbar.module.scss";
import { TransformString } from "@/common";
export default function CategoryTopbar({ slugId }) {
  return (
    <div className={styles.categoryTopbar}>
      <div className="container">
        <h1>{slugId ? TransformString(slugId) : "Explore Topics"}</h1>
      </div>
    </div>
  );
}

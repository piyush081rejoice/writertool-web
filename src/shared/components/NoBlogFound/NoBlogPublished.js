import Image from "next/image";
import React from "react";
import styles from "./NoBlogFound.module.scss";
import { useRouter } from "next/router";

const NoBlogFoundImage = "/assets/images/NoBlogFound.png";
const NoBlogPublished = () => {
  const router = useRouter();
  return (
    <div className={styles.mainDiv}>
      <Image style={{ marginBottom: "22px" }} alt="NoBlogFound" src={NoBlogFoundImage} width={194} height={156} />
      <h2 style={{ marginBottom: "10px" }}>No Blog’s Published</h2>
      <p style={{ marginBottom: "30px" }}>Create a new blog from the below button</p>
      <button
        onClick={() => {
          router.push("/write-blog");
        }}
      >
        New Blog
      </button>
    </div>
  );
};

export default NoBlogPublished;

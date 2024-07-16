import Image from "next/image";
import React from "react";
import styles from "./NoBlogFound.module.scss";
import { useRouter } from "next/router";

const NoBlogFoundImage = "/assets/images/NoBlogFound.png";
const NoBlogFound = () => {
  const router = useRouter();
  return (
    <div className={styles.mainDiv}>
      <Image style={{ marginBottom: "22px" }} alt="NoBlogFound" src={NoBlogFoundImage} width={194} height={156} />
      <h2 style={{ marginBottom: "10px" }}>No Blog’s Available</h2>
      <p style={{ marginBottom: "30px" }}>We're unable to find the blog that you're looking for...</p>
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

export default NoBlogFound;

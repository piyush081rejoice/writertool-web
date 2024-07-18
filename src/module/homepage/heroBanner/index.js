import React, { useState } from "react";
import styles from "./heroBanner.module.scss";
import Searchbar from "@/shared/components/searchbar";
import LazyImage from "@/helpers/lazyImage";
import { useRouter } from "next/router";
import Image from "next/image";
const HeroBannerImage = "/assets/images/herobanner.png";
export default function HeroBanner({ getBlogCategoryData ,showBlogs,searchKeyWord, setSearchKeyWord }) {
  // const [showBlogs, setShowBlogs] = useState(getBlogCategoryData);
  // const [searchKeyWord, setSearchKeyWord] = useState("");
  const router = useRouter();
  // const handleOnSearchClick = () => {
  //   if (searchKeyWord !== "") {
  //     const keyword = searchKeyWord?.toLowerCase();
  //     const updatedData = getBlogCategoryData?.filter((data) => data?.title?.toLowerCase().includes(keyword));
  //     setShowBlogs(updatedData);
  //   } else {
  //     setShowBlogs(getBlogCategoryData);
  //   }
  // };
  return (
    <>
      <div className={styles.heroBanner}>
        <div className="container">
          <div className={styles.relativeSection}>
            <div className={styles.line}></div>
            <div className={styles.Leftline}></div>
            <div className={styles.bottomline}></div>
            <div className={styles.rightline}></div>
            <div className={styles.flexBox}>
              <div className={styles.flexBoxItems}>
                <h1>Write Like a Pro: Tools to Unleash Your Content Superpower</h1>
                <p>Unlock your full writing potential with the WriterTools Blog. Discover powerful tools for effortless writing, impactful reading, and content that shines brighter than ever.</p>
                <Searchbar {...{ searchKeyWord, setSearchKeyWord }} />
              
              </div>
              <div className={styles.flexBoxItems}>
                <div className={styles.img}>
                  <LazyImage src={HeroBannerImage} alt="CardImage" className={styles.herobannerImage}/>
                </div>
              </div>
            </div>
            <div className={styles.tabDesign}>
                  {showBlogs?.length > 0 ? (
                    <>
                      <button onClick={() => router.push(`/category`)}>All</button>
                      {showBlogs?.map((data, index) => (
                        <button key={index} onClick={() => router.push(`/category/${data?.slugId}`)}>
                          {data?.title}
                        </button>
                      ))}
                    </>
                  ) : (
                    <div>Which blog category you're looking for isn't found, please try another blog search category.</div>
                  )}
                </div>
          </div>
       
        </div>
      </div>
      <div className={styles.loader}></div>
    </>
  );
}

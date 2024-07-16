import React from "react";
import styles from "./yourStories.module.scss";
import YourStoriesDetails from "./yourStoriesDetails";
import Breadcrumb from "../writeBlog/breadcrumb";
export default function YourStories({isTrendingBlogsData ,getBlogCategoryData}) {
  return (
    <div>
      <Breadcrumb dynamicList={"Your Stories"} />
      {/* <div className="container">
                <div className={styles.yourStoriesbreadcumbalignment}>
                    <span>Writertools</span>
                    <span>/</span>
                    <span>Library</span>
                </div>
            </div> */}
      <YourStoriesDetails {...{isTrendingBlogsData,getBlogCategoryData}} />
    </div>
  );
}

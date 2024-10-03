import WaveIcon from "@/assets/icons/waveIcon";
import { DateConvert } from "@/common";
import LazyImage from "@/helpers/lazyImage";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import styles from "./editorsPick.module.scss";
import dynamic from "next/dynamic";
const EditorsPickDetails = dynamic(() => import("./editorsPickDetails"), { ssr: false });
const TrendingBlog = dynamic(() => import("./trendingBlog"), { ssr: false });

export default function EditorsPick({ getBlogsData, getTrendingBlogData }) {
  const router = useRouter();
  return (
    <div className={styles.editorsPickSection}>
      <div className="container">
        <div className={styles.title}>
          <h2>Editor’s Pick</h2>
          <WaveIcon />
        </div>
        <div className={styles.grid}>
          <div className={styles.gridItems}>
            <div className={styles.subGrid}>
              <div className={styles.subGridItems}>
                <EditorsPickDetails {...{ getBlogsData }} />
              </div>
              <div className={styles.subGridItems}>
                {getBlogsData?.length > 0
                  ? getBlogsData?.slice(1, 5)?.map((item, i) => {
                      return (
                        <div className={styles.editorsCard} key={i}>
                          <div className={styles.editorsCardImage}>
                            {item?.thumbnail ? (
                              <LazyImage
                                style={{ cursor: "pointer" }}
                                onClick={() => router.push(`/${item?.slugId}`)}
                                src={item?.thumbnail}
                                alt={item?.coverPhotoAltTag}
                                className={styles.imageStyle}
                              />
                            ) : (
                              <div className={styles.SkeletonCard}>
                                <div>
                                  <Skeleton height={90} width={125} />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={styles.editorsCardItems}>
                            <Link href={`/${item?.slugId}`}>
                              <h3>{item?.title}</h3>
                            </Link>
                            <span>{DateConvert(item?.createdAt)}</span>
                          </div>
                        </div>
                      );
                    })
                  : Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div className={styles.SkeletonCard} key={index}>
                          <div>
                            <Skeleton height={90} width={125} />
                          </div>
                          <div style={{ marginLeft: "25px" }}>
                            <div>
                              <Skeleton count={3} width={250} height={23} className={styles.sideLine} />
                            </div>
                          </div>
                        </div>
                      ))}
              </div>
            </div>
          </div>
          <div className={styles.gridItems}>
            <TrendingBlog {...{ getTrendingBlogData }} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { DateConvert } from "@/common";
import Image from "next/image";
import Link from "next/link";
import styles from "./editorsPickDetails.module.scss";
import { useRouter } from "next/router";
import LazyImage from "@/helpers/lazyImage";
const ProfileImage = "/assets/images/profile.png";
export default function EditorsPickDetails({ getBlogsData }) {
  const singleBlog = getBlogsData?.[0];
  const  router = useRouter()
  return (
    <div className={styles.editorsPickDetails}>
      <div className={styles.imageStyle}>
        <Image style={{cursor:"pointer"}} onClick={()=>router.push(`/blog/${singleBlog?.slugId}`)}  src={singleBlog?.thumbnail} alt="CardImage" height={250} width={320} className={styles.cardImage} />
        {singleBlog?.isTrending ? (
          <div className={styles.buttonDesign}>
            <button>Trending</button>
          </div>
        ) : null}
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.firstColumn}>
          <div className={styles.leftContent}>
            <div className={styles.profileImage}>
              <LazyImage src={singleBlog?.Users?.profileImage ? singleBlog?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
            </div>
            <span style={{fontSize:"12px"}} >{singleBlog?.Users?.userName}</span>
          </div>
          <ul>
            <li>{DateConvert(singleBlog?.createdAt)}</li>
          </ul>
        </div>
        <Link href={`/blog/${singleBlog?.slugId}`}>
          <h3>{singleBlog?.title}</h3>
        </Link>
        <p className={"texttruncatesixlines"}>{singleBlog?.sortDescription ? singleBlog?.sortDescription : ""}</p>
      </div>
    </div>
  );
}

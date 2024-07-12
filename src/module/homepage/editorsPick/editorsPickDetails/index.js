import { DateConvert, GenerateDescription } from "@/common";
import Image from "next/image";
import Link from "next/link";
import styles from "./editorsPickDetails.module.scss";
const CardImage = "/assets/images/card-image.png";
const ProfileImage = "/assets/images/profile.png";
export default function EditorsPickDetails({ getBlogsData }) {
  const singleBlog = getBlogsData?.[0];
  return (
    <div className={styles.editorsPickDetails}>
      <div className={styles.imageStyle}>
        <Image src={singleBlog?.thumbnail} alt="CardImage" height={250} width={320} className={styles.cardImage} />

        <div className={styles.buttonDesign}>
          <button>Trending</button>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.firstColumn}>
          <div className={styles.leftContent}>
            <div className={styles.profileImage}>
              <Image src={singleBlog?.Users?.profileImage ? singleBlog?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
            </div>
            <span>{singleBlog?.Users?.userName}</span>
          </div>
          <ul>
            <li>{DateConvert(singleBlog?.createdAt)}</li>
          </ul>
        </div>
        <Link href="/blog-inside">
          <h3>{singleBlog?.title}</h3>
        </Link>
        <p>{GenerateDescription(singleBlog?.description)}</p>
      </div>
    </div>
  );
}

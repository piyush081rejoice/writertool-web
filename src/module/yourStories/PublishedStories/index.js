import { ApiGet } from "@/helpers/API/ApiData";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PublishedStories.module.scss";
import { DateConvert } from "@/common";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import DeleteBlog from "../DeleteBlog";
import Skeleton from "react-loading-skeleton";
import DeleteIcon from "../../../../public/assets/images/Delete.png";
import PencilEdit from "../../../../public/assets/images/Edit.png";
import NoBlogPublished from "@/shared/components/NoBlogFound/NoBlogPublished";
const ProfileImage = "/assets/images/profile.png";

const statusClasses = {
  Pending: styles.Approved,
  Approved: styles.Approved,
  Draft: styles.Approved,
  Rejected: styles.Denied,
};

const statusText = {
  Pending: "Pending",
  Approved: "Approved",
  Draft: "Draft",
  Rejected: "Rejected",
};

const PublishedStories = ({ status }) => {
  const [loading, setLoading] = useState(false)
  const [blogsData, setBlogsData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();
  useEffect(() => {
    handleBlogCategoryData();
  }, []);

  const handleBlogCategoryData = async () => {
    try {
      setLoading(true)
      const response = await ApiGet(`blog-services/blogs/get?status=${status}`);
      const data = response?.data?.payload?.blogs;
      if (response?.data?.payload?.blogs?.length>0) {
        setBlogsData(data);
        setLoading(false)
      }else{
        toast.error("The blogs that you are looking for have not been found.")
        setLoading(false)
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleToggle = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  return (
    <>
      <div className={styles.PublishedStoriesContnetAlignment}>
        <div className={styles.allCardDesign}>
          {blogsData?.length > 0
            ? blogsData?.map((data, key) => (
                <div className={styles.card} key={key}>
                  <div className={styles.cardImage}>
                    <Image height={216} width={301} src={data?.thumbnail} alt="CardImage" className={styles.cardImageStyle} />
                  </div>
                  <div>
                    <div className={styles.firstColumn}>
                      <div className={styles.leftContent}>
                        <div className={styles.profileImage}>
                          <Image src={data?.Users?.profileImage ? data?.Users?.profileImage : ProfileImage} alt="ProfileImage" height={34} width={34} className={styles.profileImageStyle} />
                        </div>
                        <span>{data?.Users?.userName}</span>
                      </div>
                      <ul>
                        <li>{DateConvert(data?.createdAt)}</li>
                      </ul>
                    </div>
                    <h3>{data?.title}</h3>
                    <p>{data?.sortDescription ?data?.sortDescription:""}</p>
                    <div className={styles.iconAlignment}>
                      <div className={styles.imageAlignment}>
                        {data?.status !== "Rejected" ? (
                          <>
                            <span style={{ cursor: "pointer" }} onClick={() => router.push(`/update-blog/${data?._id}`)}>
                              <Image height={30} width={30} src={PencilEdit} />
                            </span>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleToggle();
                                setDeleteId(data?._id);
                              }}
                            >
                              <Image height={30} width={30} src={DeleteIcon} />
                            </span>
                          </>
                        ) : null}
                      </div>
                      <div>
                        <div>{data?.status && <div className={statusClasses[data.status]}>{statusText[data.status]}</div>}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : loading ? Array(4)
            .fill(0)
            .map((_, index) => (
              <div className={styles.SkeletonCard} key={index}>
                <div>
                  <Skeleton height={216} width={301} />
                </div>
                <div style={{marginLeft:"25px"}}>
                  <div className={styles.alignImage}>
                    <Skeleton circle={true} height={34} width={34} />
                    <Skeleton style={{marginLeft:"15px"}} width={200} />
                  </div>
                  <div style={{marginTop:"25px"}} >
                   <Skeleton  count={4} width={250} height={20} className={styles.alignImage} />
                  </div>
                </div>
              </div>
            )) : <NoBlogPublished/>
            
            }
        </div>
      </div>
      {showDeleteModal && <DeleteBlog deleteId={deleteId} handleToggle={handleToggle} handleBlogCategoryData={handleBlogCategoryData} />}
    </>
  );
};

export default PublishedStories;

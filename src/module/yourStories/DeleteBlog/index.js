import React, { useState } from "react";
import styles from "./DeleteBlog.module.scss";
import Warning from "@/assets/icons/warning";
import toast from "react-hot-toast";
import Loader from "@/common/Loader";
import { ApiDelete } from "@/helpers/API/ApiData";


const DeleteBlog = ({deleteId,handleToggle ,handleBlogCategoryData}) => {
  const [showDeleteBlogLoader, setShowDeleteBlogLoader] = useState(false)

  const handleDelete = async () =>{
    setShowDeleteBlogLoader(true)
    try {
      const response = await ApiDelete(`blog-services/blogs/delete-blog/${deleteId}`);
      if (response?.data?.success) {
        setShowDeleteBlogLoader(false)
        toast.success(response?.data?.message || "Blog deleted successfully")
        handleToggle()
        handleBlogCategoryData()
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      setShowDeleteBlogLoader(false)
    }

  }
  return (
    <div className={styles.modebackgroundmain}>
      <div className={styles.modelrelativmain}>
        <div className={styles.modelmain}>
          <div className={styles.modeltopwarning}>
            <Warning />
          </div>
          <div className={styles.modalcotantmain}>
            <h1>Delete Blog</h1>
            <p>Are You sure want to delete this blog? This action cannot be undone</p>
            <div className={styles.modalbuttonmain}>
              <button disabled={showDeleteBlogLoader} onClick={handleToggle}>Cancel</button>
              <button disabled={showDeleteBlogLoader} onClick={handleDelete} className={styles.deletebutton}>Delete {showDeleteBlogLoader? <span><Loader/></span> :null }</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlog;

import React, { useState } from "react";
import styles from "./BlogConfimModal.module.scss";
import CloseIcon from "@/assets/icons/closeIcon";
import toast from "react-hot-toast";
import { ApiPost } from "@/helpers/API/ApiData";
const Logo = "/assets/logo/logo.svg";
const trueIcon = "/assets/images/trueIcon.svg";

const BlogConfimModal = ({ blogPaymentData, setBlogPaymentData }) => {
  const [loading, setLoading] = useState(false);
  const handleModalClose = () => {
    setBlogPaymentData(null);
  };

  const handleInstantPublish = async () => {
    try {
      const res = await ApiPost("blog-services/payment/payment-link",{blogId:blogPaymentData?._id});
      if (res?.data?.success) {
        console.log("🚀 ~ file: index.js:18 ~ handleInstantPublish ~ res:", res)
        window.open(res?.data?.payload?.paymentLink)
        // setBlogPaymentData(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.blogConfimModal}>
      <div className={styles.blogModalContent}>
        <div className={styles.close} onClick={handleModalClose}>
          <CloseIcon />
        </div>
        <img src={Logo} alt="Logo" />
        <div className={styles.blogModalTitle}>
          <h2>Publish Your Blog</h2>
          <p>Publish Your Blog, Boost Your Reach: Generate Quality Backlinks Effortlessly!</p>
        </div>
        <div className={styles.blogModalCost}>
          <div className={styles.blogModalCostBox}>
            <h3>Free</h3>
            <div className={styles.blogModalBoxCheck}>
              <img src={trueIcon} alt="Logo" />
              <p>Waiting for 2-4 weeks to publish</p>
            </div>
            <button type="button">Select</button>
          </div>
          <div className={styles.blogModalCostBox}>
            <h3>
              $0.99 <span>Per Blog</span>
            </h3>
            <div className={styles.blogModalBoxCheck}>
              <img src={trueIcon} alt="Logo" />
              <p>Instant publish</p>
            </div>
            <button onClick={handleInstantPublish} type="button">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogConfimModal;

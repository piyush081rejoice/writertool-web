import React, { useEffect, useState } from "react";
import styles from "./selectCategories.module.scss";
import classNames from "classnames";
import toast from "react-hot-toast";
import { ApiGet, ApiPut } from "@/helpers/API/ApiData";
import { setCookie } from "@/hooks/useCookie";
import Skeleton from "react-loading-skeleton";
import Loader from "@/common/Loader";
const Logo = "/assets/logo/logo.svg";
const Leftarrow = "/assets/icons/leftarrow.svg";

export default function SelectCategories({ inputValue, setIsOnBoardingComplete,productValue ,toggle }) {
  const [getBlogCategoryData, setGetBlogCategoryData] = useState();
  const [getBlogCategoryDataLoading, setGetBlogCategoryDataLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading,setIsLoading]= useState(false)

  useEffect(() => {
    handleBlogCategoryData();
  }, []);

  const handleBlogCategoryData = async () => {
    try {
      const response = await ApiGet(`blog-services/blog-categories/get?isActive=true&skip=1&limit=50`);
      const data = response?.data?.payload;
      if (response?.data?.success) {
        setGetBlogCategoryDataLoading(false)
        setGetBlogCategoryData(data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
    }
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category?._id)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category?._id));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category?._id]);
      } else {
        toast.error("You can select a maximum of 3 categories.");
      }
    }
  };

  const handleContinue = async () => {
    setIsLoading(true)
    if (selectedCategories?.length > 0) {
      try {
        let formData = new FormData();
        
        inputValue?.ProductName && formData.append("productName", inputValue?.ProductName);
        productValue?._id && formData.append("productCategory", productValue?._id);
        inputValue?.ProductURL && formData.append("productURL", inputValue?.ProductURL);
        selectedCategories.forEach((category, index) => {
          formData.append(`interestedCategories[${index}]`, category);
        });
        const resp = await ApiPut("user-services/user/update-profile", formData);
        if (resp?.data?.success) {
          toast.success("Welcome to WritterTools");
          setIsLoading(false)
          setCookie("isProfileCompleted", true);
          setIsOnBoardingComplete(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
        setIsLoading(false)
      }
    } else {
      toast.error("Please select at least one category of your interest.");
      setIsLoading(false)
    }
  };

  return (
    <div className={classNames(styles.selectCategoriesWrapper, styles.openModalWrapper)}>
      <div className={styles.selectCategories}>
        <div className={styles.modalHeader}>
          <img src={Logo} alt="Logo" width="100%" height="100%" />
          <span>2 / 2</span>
        </div>
        <div className={styles.title}>
          <h2>Select Interested Blog Categories 👋</h2>
        </div>
        <div className={styles.line}>
          <div className={styles.activeLine}></div>
        </div>
        {getBlogCategoryDataLoading ? (
          <div className={styles.categoriesbuttonwrapper}>
            {[...Array(12)]?.map((_, index) => <div><Skeleton style={{height:"33px",borderRadius:"99px"}}  key={index} /> </div>)}
          </div>
        ) : (
          <div className={styles.categoriesbutton}>
            {getBlogCategoryData?.blog_category?.map((category) => (
              <button  key={category?._id} onClick={() => toggleCategory(category)} className={selectedCategories.includes(category?._id) ? styles.selected : ""}>
                {category?.title}
              </button>
            ))}
          </div>
        )}
        <div className={styles.button} onClick={handleContinue}>
          <button disabled={isLoading}>Continue {isLoading ? <Loader /> :null}</button>
        </div>
        <div className={styles.skipText} onClick={toggle} >
          <span><img src={Leftarrow} alt="Leftarrow" width="100%" height="100%" />Back</span>
        </div>
      </div>
    </div>
  );
}

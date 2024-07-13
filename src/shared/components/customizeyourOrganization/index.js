import React, { useEffect, useRef, useState } from "react";
import styles from "./customizeyourOrganization.module.scss";
import classNames from "classnames";
import Input from "../input";
import { useOnChange } from "@/hooks/onChangeHook";
import SelectCategories from "../selectCategories";
import toast from "react-hot-toast";
import { ApiGet } from "@/helpers/API/ApiData";
import DownArrow from "@/assets/icons/downArrow";
import { WEBSITE_URL_REGEX } from "@/helpers/Constant";
const Logo = "/assets/logo/logo.svg";

export default function CustomizeyourOrganization({ setIsOnBoardingComplete }) {
  const [getProductCategoryData, setGetProductCategoryData] = useState();
  const { inputValue, handleChange } = useOnChange();
  const [productValue, setProductValue] = useState("Select product category");
  const [openBlogsCategory, setOpenBlogsCategory] = useState(false);
  const [errors, setError] = useState({});

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (inputValue?.ProductURL?.length > 0) {
      if (!WEBSITE_URL_REGEX.test(inputValue?.ProductURL)) {
        formIsValid = false
        errors["productUrlError"]="Please enter valid Product URL"
      }
    }
    setError(errors);
    return formIsValid;
  };
  const toggle = () => {
    if (validateForm()) {
      setOpenBlogsCategory(!openBlogsCategory);
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    handleProductCategoryData();
  }, []);

  const handleProductCategoryData = async () => {
    try {
      const response = await ApiGet(`user-services/product-category/get`);
      const data = response?.data?.payload;
      setGetProductCategoryData(data);
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleProductChange = (item) => {
    setProductValue(item);
    setShowDropdown(false);
  };
  return (
    <>
      <div className={classNames(styles.customizeyourOrganizationWrapper, styles.openModalWrapper)}>
        <div className={styles.customizeyourOrganization}>
          <div className={styles.modalHeader}>
            <img src={Logo} alt="Logo" width="100%" height="100%" />
            <span>1 / 2</span>
          </div>
          <div className={styles.title}>
            <h2>Customize your Organization 👋</h2>
          </div>
          <div className={styles.inputSpacer}>
            <Input onChange={handleChange} name="ProductName" value={inputValue?.ProductName || ""} label="Product Name" placeholder="Enter your product name" />
          </div>
          <div className={styles.selectDropdownDesign}>
            <label>Product Category</label>
            <div className={styles.relative}>
              <input style={{cursor:"pointer"}} readOnly type="text" value={productValue?.title ? productValue?.title : productValue} onClick={() => setShowDropdown(!showDropdown)} />
              <div className={classNames(styles.icon, showDropdown ? styles.toggleIcon : styles.toggledIcon)}>
                <DownArrow />
              </div>
              <div className={classNames(styles.dropdownDesign, showDropdown ? styles.show : styles.hide)}>
                {getProductCategoryData?.product_category?.map((data, index) => (
                  <span onClick={() => handleProductChange(data)} key={index}>
                    {data?.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.inputSpacer}>
            <Input label="Product URL" placeholder="https://www.writertools.ai/" onChange={handleChange} name="ProductURL" value={inputValue?.ProductURL || ""} />
            {errors?.productUrlError && <span className={styles.productUrlError} >{errors?.productUrlError}</span>}
          </div>
          <div className={styles.button} onClick={toggle}>
            <button>Continue</button>
          </div>
          <div className={styles.skipText} onClick={toggle}>
            <span>Skip</span>
          </div>
        </div>
      </div>
      {openBlogsCategory && <SelectCategories toggle={toggle} setIsOnBoardingComplete={setIsOnBoardingComplete} inputValue={inputValue} handleChange={handleChange} productValue={productValue} />}
    </>
  );
}

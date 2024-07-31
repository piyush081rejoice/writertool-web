import React, { useEffect, useRef, useState } from "react";
import styles from "./profileDetails.module.scss";
import WaveIcon from "@/assets/icons/waveIcon";
import EditIcon from "@/assets/icons/editIcon";
import WriteIcon from "@/assets/icons/writeIcon";
import Input from "@/shared/components/input";
import classNames from "classnames";
import { useOnChange } from "@/hooks/onChangeHook";
import OnClickOutside from "@/hooks/useClickOutside";
import DownArrow from "@/assets/icons/downArrow";
import toast from "react-hot-toast";
import { isEmpty } from "@/hooks/isEmpty";
import { validateUrl } from "@/hooks/validateUrl";
import ShowError from "@/common/ShowError";
import { ApiPut } from "@/helpers/API/ApiData";
import Loader from "@/common/Loader";
import ChangePassword from "@/shared/components/changePassword";
import LazyImage from "@/helpers/lazyImage";
import CloseIcon from "@/assets/icons/closeIcon";
const LinkIcon = '/assets/icons/link.svg';
export default function ProfileDetails({ userProfileData, getProductCategoryData, blogCategories }) {
  const [editButtonDisable, setEditButtonDisable] = useState(true);
  const { inputValue, handleChange, setInputValue, errors, setErrors } = useOnChange(userProfileData);
  const [interestedCategories, setInterestedCategories] = useState([]);
  const [blogCategoriesData, setBlogCategoriesData] = useState();
  const [productCategoryID, setProductCategoryID] = useState("");
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  useEffect(() => {
    if (showPasswordModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showPasswordModal]);
  const dropDownRef = useRef(null);
  const blogCategoryRef = useRef(null);
  const fileInputRef = useRef(null);

  const ProfileImage = "/assets/images/headerUser.jpg";

  const [showDropdown, setShowDropdown] = useState(false);
  const [showBlogDropdown, setShowBlogDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const toggleDropDown = () => setShowDropdown(false);
  const toggleBlogDropDown = () => setShowBlogDropdown(false);
  OnClickOutside([dropDownRef], toggleDropDown);
  OnClickOutside([blogCategoryRef], toggleBlogDropDown);
  const handleProductChange = (data) => {
    setProductCategoryID(data?._id);
    setInputValue((prevErrors) => ({ ...prevErrors, productCategoryName: data?.title }));
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setInterestedCategories(blogCategories?.filter((category) => inputValue?.interestedCategoriesNames?.includes(category.title)));
    setBlogCategoriesData(blogCategories?.filter((category) => !inputValue?.interestedCategoriesNames?.includes(category.title)));
  }, []);
  const removeSelectedBlog = (data) => {
    setBlogCategoriesData([...blogCategoriesData, data]);
    setInterestedCategories(interestedCategories?.filter((item) => item?._id !== data?._id));
  };
  const handleBlogsCategories = (category) => {
    if (interestedCategories?.length < 3) {
      setInterestedCategories([...interestedCategories, category]);
      setBlogCategoriesData(blogCategoriesData?.filter((data) => data?._id != category?._id));
    } else {
      toast.error("You can select a maximum of 3 categories.");
    }
  };

  const validateForm = () => {
    let updatedError = {};
    let formIsValid = true;
    if (isEmpty(inputValue?.userName)) {
      formIsValid = false;
      updatedError["userName"] = "Please enter user name .";
    }

    const socialMediaFields = ["productURL", "facebookLink", "instagramLink", "linkedinLink", "twitterLink", "youtubeLink"];

    socialMediaFields.forEach((field) => {
      if (inputValue[field]?.length && !validateUrl(inputValue[field], field, updatedError)) {
        formIsValid = false;
      }
    });
    if (!interestedCategories?.length > 0) {
      formIsValid = false;
      updatedError["interestedCategoriesNames"] = "Please select at least one category of your interest.";
    }
    setErrors(updatedError);
    return formIsValid;
  };

  const handleOnEditButtonClick = () => {
      setEditButtonDisable(false);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("userName", inputValue?.userName);
      formData.append("email", inputValue?.email);
      interestedCategories.forEach((category, index) => {
        formData.append(`interestedCategories[${index}]`, category?._id);
      });

      if (!isEmpty(inputValue?.productName)) {
        formData.append("productName", inputValue?.productName);
      }
      if (!isEmpty(productCategoryID)) {
        formData.append("productCategory", productCategoryID);
      }
      if (!isEmpty(inputValue?.productURL)) {
        formData.append("productURL", inputValue?.productURL);
      }
      if (!isEmpty(userProfile)) {
        formData.append("profileImage", userProfile);
      }
      if (!isEmpty(inputValue?.shortBio)) {
        formData.append("shortBio", inputValue?.shortBio);
      }
      if (!isEmpty(inputValue?.youtubeLink)) {
        formData.append("youtubeLink", inputValue?.youtubeLink);
      }
      if (!isEmpty(inputValue?.twitterLink)) {
        formData.append("twitterLink", inputValue?.twitterLink);
      }
      if (!isEmpty(inputValue?.linkedinLink)) {
        formData.append("linkedinLink", inputValue?.linkedinLink);
      }
      if (!isEmpty(inputValue?.instagramLink)) {
        formData.append("instagramLink", inputValue?.instagramLink);
      }
      if (!isEmpty(inputValue?.facebookLink)) {
        formData.append("facebookLink", inputValue?.facebookLink);
      }
      try {
        const resp = await ApiPut("user-services/user/update-profile", formData, { "Content-Type": "multipart/form-data" });
        if (resp?.data?.success) {
          localStorage.setItem("userData", JSON.stringify(resp?.data?.payload));
          const event = new Event("localStorageUpdate");
          window.dispatchEvent(event);
          toast.success("Your profile has been successfully updated!");
          setIsLoading(false);
          setEditButtonDisable(true);
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
        setIsLoading(false);
      }
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPEG, PNG, GIF)");
    } else {
      setUserProfile(file);

      setCoverPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className={styles.profileDetailsAllContentAlignment}>
        <div className="container">
          <div className={styles.title}>
            <h1>Profile Setting</h1>
            <WaveIcon />
          </div>
          <div className={styles.box}>
            <form onSubmit={(e) => handleSubmitForm(e)}>
              <div className={styles.profileHeaderalignment}>
                <div className={styles.leftContent}>
                  <div className={styles.profile}>
                    <LazyImage src={coverPhotoPreview ? coverPhotoPreview : inputValue?.profileImage ? inputValue?.profileImage : ProfileImage} alt="ProfileImage" height={100} width={100} />
                    <input type="file" style={{ display: "none" }} onChange={handleImageChange} ref={fileInputRef} />
                    {
                      !editButtonDisable ?<div className={styles.editIcon} onClick={handleImageUpload}>
                      <EditIcon />
                    </div> :null
                    }
                    
                  </div>
                  <div>
                    <p>{inputValue?.userName}</p>
                    <span>{inputValue?.email}</span>
                  </div>
                </div>

                <div className={styles.button}>
                  <button type="button" onClick={handleOnEditButtonClick} className={styles.fill}>
                    <WriteIcon />
                    Edit
                  </button>
                </div>
              </div>
              <div className={styles.allAlignment}>
                <div className={styles.twoColGrid}>
                  <Input inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false}  required={true} errorMessage={errors?.userName} name={"userName"} value={inputValue?.userName} onChange={handleChange} label="Name*" placeholder="Enter your name" />
                  <Input
                    readonly
                    inputClassName={styles.editButtonDisable}
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    errorMessage={errors?.email}
                    name={"email"}
                    value={inputValue?.email}
                    onChange={handleChange}
                    label="Email"
                    placeholder="Writertools123@gmail.com"
                  />
                  <Input inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false} name={"productName"} value={inputValue?.productName} onChange={handleChange} label="Product Name" placeholder="Enter your product name" />
                  <div className={styles.selectDropdownDesign}>
                    <label>Product Category</label>
                    <div ref={dropDownRef} className={styles.relative}>
                      <input
                        style={{ cursor: "pointer" }}
                        inputClassName={editButtonDisable? styles.editButtonDisable :""} disabled={editButtonDisable ? true :false}
                        readOnly
                        type="text"
                        value={inputValue?.productCategoryName ? inputValue?.productCategoryName : "Select product category"}
                        onClick={() => setShowDropdown(!showDropdown)}
                      />
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
                  <Input inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false}  icon={LinkIcon} name={"productURL"} value={inputValue?.productURL} onChange={handleChange} errorMessage={errors?.productURL} label="Product URL" placeholder="https://www.writertools.ai/" />
                  <Input inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false}  name={"shortBio"} value={inputValue?.shortBio} onChange={handleChange} label="Short Bio" placeholder="Enter your short bio" />
                  <Input inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false} icon={LinkIcon} errorMessage={errors?.youtubeLink} name={"youtubeLink"} value={inputValue?.youtubeLink} onChange={handleChange} label="Youtube Link" placeholder="https://www.youtube.com/ " />
                  <Input inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false} icon={LinkIcon} errorMessage={errors?.twitterLink} name={"twitterLink"} value={inputValue?.twitterLink} onChange={handleChange} label="Twitter Link" placeholder="https://www.twitter.com/ " />
                  <Input
                   inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false}
                    icon={LinkIcon}
                    errorMessage={errors?.linkedinLink}
                    name={"linkedinLink"}
                    value={inputValue?.linkedinLink}
                    onChange={handleChange}
                    label="Linkedin Link"
                    placeholder="https://www.linkedin.com/ "
                  />
                  <Input
                   icon={LinkIcon}
                   inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false}
                    errorMessage={errors?.instagramLink}
                    name={"instagramLink"}
                    value={inputValue?.instagramLink}
                    onChange={handleChange}
                    label="Instagram Link"
                    placeholder="https://www.instagram.com/"
                  />
                  <Input
                    icon={LinkIcon}
                    inputClassName={editButtonDisable? styles.editButtonDisable :""} readonly={editButtonDisable ? true :false}
                    errorMessage={errors?.facebookLink}
                    name={"facebookLink"}
                    value={inputValue?.facebookLink}
                    onChange={handleChange}
                    label="Facebook Link"
                    placeholder="https://www.facebook.com/"
                  />
                </div>
              </div>
            
            <div className={styles.blogInfo}>
              <h2>Interested Blog’s Categories 👋</h2>
              <div className={styles.buttonAlignment}>
                {/* <div className={styles.buttonclsmain}> */}
                {interestedCategories?.length > 0 ? (
                  interestedCategories?.map((item, index) => (
                    <button type="button" key={index}>
                      {item?.title}{" "}
                      {!editButtonDisable && (
                        <div style={{ lineHeight: "normal", height: "15px" }} onClick={() => removeSelectedBlog(item)}>
                          <CloseIcon />
                        </div>
                      )}
                    </button>
                  ))
                ) :  (
                  <div style={{ color: "red" }}> Please select one at least one category from below.</div>
                )}
                {/* </div> */}
              </div>
              {!editButtonDisable ? (
                <div className={styles.selectGrid}>
                <div style={{ marginTop: "10px" }} className={styles.selectDropdownDesign}>
                  <label>Blog’s Categories</label>
                  <div className={styles.relative} ref={blogCategoryRef}>
                    <input style={{ cursor: "pointer" }} readOnly type="text" value={"Select blog category from below"} onClick={() => setShowBlogDropdown(!showBlogDropdown)} />
                    <div className={classNames(styles.icon, showBlogDropdown ? styles.toggleIcon : styles.toggledIcon)}>
                      <DownArrow />
                    </div>
                    <div className={classNames(styles.dropdownDesign, showBlogDropdown ? styles.show : styles.hide)}>
                      {blogCategoriesData?.length > 0
                        ? blogCategoriesData?.map((data, index) => (
                            <span onClick={() => handleBlogsCategories(data)} key={index}>
                              {data?.title}
                            </span>
                          ))
                        : "No category's found"}
                    </div>
                  </div>
                </div>
                </div>
              ) : null}
            </div>
            <div className={classNames(styles.twoColGrid, styles.gap ,styles.saveButton)}>
              <div className={styles.button}>
                <button style={{ cursor: editButtonDisable ? "not-allowed" : "pointer" }} disabled={editButtonDisable || isLoading} type="submit"  className={styles.fill}>
                  Save Changes {isLoading ? <Loader /> : null}
                </button>
              </div>
              <div className={styles.button}>
                <button type="button" onClick={() => setShowPasswordModal(true)} className={styles.outline}>
                  Change Password
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
      {showPasswordModal && <ChangePassword setShowPasswordModal={setShowPasswordModal} />}
    </>
  );
}

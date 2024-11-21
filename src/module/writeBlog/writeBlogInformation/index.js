import CloseIcon from "@/assets/icons/crosearrow";
import DownArrow from "@/assets/icons/downArrow";
import ModalCloseIcon from "@/assets/icons/closeIcon";
import DraftIcon from "@/assets/icons/Draft";
import GalleryIcon from "@/assets/icons/galleryIcon";
import PreviewIcon from "@/assets/icons/Preview";
import PublishIcon from "@/assets/icons/Publish";
import WaveIcon from "@/assets/icons/waveIcon";
import Loader from "@/common/Loader";
import ShowError from "@/common/ShowError";
import { ApiPost } from "@/helpers/API/ApiData";
import { BUTTON_LIST } from "@/helpers/Constant";
import { isEmpty } from "@/hooks/isEmpty";
import { useOnChange } from "@/hooks/onChangeHook";
import OnClickOutside from "@/hooks/useClickOutside";
import { validateUrl } from "@/hooks/validateUrl";
import BlogPreviewModal from "@/module/blogInside/blogInsideDetails/BlogPreviewModal";
import Input from "@/shared/components/input";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import "suneditor/dist/css/suneditor.min.css";
import styles from "./writeBlogInformation.module.scss";
const SunEditor = dynamic(() => (typeof window !== "undefined" ? import("suneditor-react").then((mod) => mod.default) : Promise.resolve(() => <div>Loading...</div>)), { ssr: false });
const LinkIcon = "/assets/icons/link.svg";
const Logo = "/assets/logo/logo.svg";
const trueIcon = "/assets/images/trueIcon.svg";
export default function WriteBlogInformation({ getBlogCategoryData, updateId, updateBlogData }) {
  const { inputValue, handleChange, setInputValue, errors, setErrors } = useOnChange({
    youtubeLink: "",
    twitterLink: "",
    linkedinLink: "",
    facebookLink: "",
    instagramLink: "",
    websiteLink: "",
    title: "",
    slugId: "",
    sortDescription: "",
    coverPhotoAltTag: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState({ publish: false, draft: false, instantPublish: false });
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [keyWords, setKeyWords] = useState([]);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [editorValue, setEditorValue] = useState("");
  const [allBlogs, setAllBlogs] = useState(getBlogCategoryData);
  const fileInputRef = useRef(null);
  // const sunEditorRef = useRef(null);
  const router = useRouter();
  const dropDownRef = useRef(null);
  const toggleDropDown = () => setShowDropdown(false);
  OnClickOutside([dropDownRef], toggleDropDown);
  const handleBlogChange = (data) => {
    setSelectedBlogs([...selectedBlogs, data]);
    setAllBlogs(allBlogs?.filter((item) => item?._id !== data?._id));
    setErrors({ ...errors, blogCategory: "" });
  };

  const removeSelectedBlog = (data) => {
    setAllBlogs([...allBlogs, data]);
    setSelectedBlogs(selectedBlogs?.filter((item) => item?._id !== data?._id));
  };
  const removeSelectedKeyword = (data) => {
    setKeyWords(keyWords?.filter((item) => item != data));
  };
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPEG, PNG, GIF)");
    } else {
      setInputValue({ ...inputValue, ["coverPhoto"]: e?.target?.files[0] });
      setErrors({ ...errors, ["coverPhoto"]: "" });
      setCoverPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let updatedError = {};
    let formIsValid = true;
    if (isEmpty(selectedBlogs.length)) {
      formIsValid = false;
      updatedError["blogCategory"] = "Please choose at least one blog category.";
    }
    if (isEmpty(inputValue?.title)) {
      formIsValid = false;
      updatedError["title"] = "Please provide a blog title.";
    }
    if (isEmpty(inputValue?.coverPhotoAltTag)) {
      formIsValid = false;
      updatedError["coverPhotoAltTag"] = "Please provide a cover image alt tag.";
    }
    if (isEmpty(inputValue?.metaDescription)) {
      formIsValid = false;
      updatedError["metaDescription"] = "Please provide a meta description.";
    }
    if (isEmpty(inputValue?.metaTitle)) {
      formIsValid = false;
      updatedError["metaTitle"] = "Please provide a meta title.";
    }

    if (isEmpty(inputValue?.sortDescription)) {
      formIsValid = false;
      updatedError["sortDescription"] = "Please provide a short Description.";
    }
    if (isEmpty(coverPhotoPreview)) {
      formIsValid = false;
      updatedError["coverPhoto"] = "Please upload cover photo.";
    }
    if (isEmpty(editorValue)) {
      formIsValid = false;
      updatedError["description"] = "Please enter description.";
    }
    const socialMediaFields = ["youtubeLink", "twitterLink", "linkedinLink", "facebookLink", "instagramLink", "websiteLink"];

    socialMediaFields.forEach((field) => {
      if (inputValue[field]?.length && !validateUrl(inputValue[field], field, updatedError)) {
        formIsValid = false;
      }
    });
    setErrors(updatedError);
    return formIsValid;
  };

  const handlePreviewModal = () => {
    setPreviewModal(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [blogPaymentModal, setBlogPaymentModal] = useState(false);
  const handlePublishClick = () => {
    if (validateForm()) {
      setBlogPaymentModal(true);
    }
  };

  const handleInstantPublish = async (id) => {
    setLoading({ publish: false, draft: false, instantPublish: true });
    try {
      const res = await ApiPost("blog-services/payment/payment-link", { blogId: id });
      if (res?.data?.success) {
        console.log("🚀 ~ file: index.js:18 ~ handleInstantPublish ~ res:", res);
        window.open(res?.data?.payload?.paymentLink, "_self");
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading({ publish: false, draft: false, instantPublish: false });
    }
  };
  const handleSubmitBlog = async (status, instantPublish) => {
    if (validateForm()) {
      setLoading(status === "Draft" ? { publish: false, draft: true } : { publish: true, draft: false });
      if (instantPublish) {
        setLoading({ publish: false, draft: false, instantPublish: true });
      }
      let formData = new FormData();
      try {
        formData.append("title", inputValue?.title);
        formData.append("sortDescription", inputValue?.sortDescription);
        formData.append("description", editorValue);
        formData.append("coverPhoto", inputValue?.coverPhoto);
        formData.append("metaTitle", inputValue?.metaTitle);
        formData.append("metaDescription", inputValue?.metaDescription);
        formData.append("coverPhotoAltTag", inputValue?.coverPhotoAltTag);
        selectedBlogs.forEach((category, index) => {
          formData.append(`blogCategoryId[${index}]`, category?._id);
        });
        if (keyWords.length > 0) {
          keyWords.forEach((keyWord, index) => {
            formData.append(`keyWords[${index}]`, keyWord);
          });
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
        if (!isEmpty(inputValue?.facebookLink)) {
          formData.append("facebookLink", inputValue?.facebookLink);
        }
        if (!isEmpty(inputValue?.slugId)) {
          formData.append("slugId", inputValue?.slugId);
        }
        if (!isEmpty(inputValue?.websiteLink)) {
          formData.append("websiteLink", inputValue?.websiteLink);
        }
        if (!isEmpty(inputValue?.instagramLink)) {
          formData.append("instagramLink", inputValue?.instagramLink);
        }
        if (status === "Draft") {
          formData.append("status", status);
        } else if (status === "Pending") {
          formData.append("status", status);
        }
        const res = await ApiPost(updateId ? `blog-services/blogs/update/${updateId}` : "blog-services/blogs/create", formData, { "Content-Type": "multipart/form-data" });
        if (res?.data?.success) {
          console.log(`res?.data`, res?.data?.payload?._id);
          if (updateId) {
            toast.success(res?.data?.payload?.message || "Your blog has been successfully updated.");
          } else if (!instantPublish) {
            toast.success(res?.data?.payload?.message || "Your blog has been submitted for approval.");
          }

          if (instantPublish) {
            handleInstantPublish(res?.data?.payload?._id);
          }
          setInputValue({});
          setKeyWords([]);
          setSelectedBlogs([]);
          setCoverPhotoPreview(null);
          setEditorValue("");
          if (!instantPublish) {
            router.push("/your-stories");
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading({ publish: false, draft: false });
        // setBlogPaymentModal(false)
      }
    }
  };

  useEffect(() => {
    if (updateId) {
      setInputValue(updateBlogData);
      setCoverPhotoPreview(updateBlogData?.coverPhoto ? updateBlogData?.coverPhoto : null);
      setKeyWords(updateBlogData?.keyWords ? updateBlogData?.keyWords : null);
      setSelectedBlogs(getBlogCategoryData?.filter((data) => updateBlogData?.blogCategoryId?.some((categoryObj) => categoryObj?._id === data?._id)));
      setAllBlogs(getBlogCategoryData?.filter((item) => !updateBlogData?.blogCategoryId?.some((categoryObj) => categoryObj?._id === item?._id)));
      setEditorValue(updateBlogData?.description ? updateBlogData?.description : "");
    }
  }, []);

  const removeCoverImage = () => {
    const newObject = { ...inputValue };
    newObject["coverPhoto"] = "";
    setInputValue(newObject);
    setCoverPhotoPreview(null);
  };

  const handleOnChange = (val) => {
    if (val == "<p><br></p>") {
      setEditorValue("");
    } else {
      setEditorValue(val);
      setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }
  };

  const handleOnKeyWordChange = () => {
    if (keyWords.includes(inputValue?.Keywords)) {
      toast.error("The same keywords cannot be added. Please try again with different keywords.");
    } else {
      setKeyWords((prevKeyword) => [...prevKeyword, inputValue?.Keywords]);
      setInputValue((prevKeyword) => ({ ...prevKeyword, Keywords: "" }));
    }
  };

  const handleOnValueChange = (e) => {
    setInputValue((prevKeyword) => ({ ...prevKeyword, slugId: e.target.value?.toLowerCase() }));
    setErrors((prevErrors) => ({ ...prevErrors, slugId: "" }));
  };

  const handleKeyDown = (e) => {
    if (e?.key === "Enter" && inputValue?.Keywords) {
      handleOnKeyWordChange();
      e?.preventDefault();
    }
  };

  return (
    <>
      {previewModal ? (
        <div className="container">
          <BlogPreviewModal coverPhotoPreview={coverPhotoPreview} editorValue={editorValue} singleBlog={inputValue} setPreviewModal={setPreviewModal} />
        </div>
      ) : (
        <div className={styles.writeBlogInformationAlignment}>
          <div className="container">
            <div className={styles.title}>
              <h2>{updateId ? "Update" : "Write"} Blog</h2>
              <WaveIcon />
            </div>
            <div className={styles.box}>
              <div className={styles.grid}>
                <div className={styles.gridItems}>
                  <div className={styles.spacer}>
                    <Input errorMessage={errors?.title} label="Blog Title*" placeholder="Type your title..." onChange={handleChange} name="title" value={inputValue?.title} />
                  </div>
                  <div className={styles.spacer}>
                    <div className={styles.selectDropdownDesign}>
                      <label>Blog Category*</label>
                      {selectedBlogs?.length > 0 && (
                        <div className={styles.buttonclsmain}>
                          {selectedBlogs?.map((data, key) => (
                            <button key={key}>
                              {" "}
                              {data?.title}{" "}
                              <span onClick={() => removeSelectedBlog(data)}>
                                <CloseIcon />
                              </span>{" "}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className={styles.relative} ref={dropDownRef}>
                        <input style={{ cursor: "pointer" }} readOnly type="text" value={"Select blog category from below"} onClick={() => setShowDropdown(!showDropdown)} />
                        <div className={classNames(styles.icon, showDropdown ? styles.toggleIcon : styles.toggledIcon)}>
                          <DownArrow />
                        </div>
                        <div className={classNames(styles.dropdownDesign, showDropdown ? styles.show : styles.hide)}>
                          {allBlogs?.map((data, index) => (
                            <span onClick={() => handleBlogChange(data)} key={index}>
                              {data?.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {errors?.blogCategory ? <ShowError errorMessage={errors?.blogCategory} /> : null}
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      icon={LinkIcon}
                      label="Website URL"
                      placeholder="https://writertools.ai/"
                      onChange={handleChange}
                      name="websiteLink"
                      value={inputValue?.websiteLink}
                      errorMessage={errors?.websiteLink}
                    />
                  </div>
                  <div className={styles.spacer}>
                    <Input icon={LinkIcon} label="Slug URL" placeholder="Type your slug URL" onChange={handleOnValueChange} name="slugId" value={inputValue?.slugId} errorMessage={errors?.slugId} />
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      label="Short Description*"
                      placeholder="Type your Short Description"
                      onChange={handleChange}
                      name="sortDescription"
                      value={inputValue?.sortDescription}
                      errorMessage={errors?.sortDescription}
                    />
                  </div>
                  <div className={styles.spacer}>
                    <Input label="Keywords" placeholder="Type your Keywords ..." onChange={handleChange} name="Keywords" value={inputValue?.Keywords} onKeyDown={handleKeyDown} />
                    {keyWords.length > 0 ? (
                      <div style={{ marginTop: "5px" }}>
                        {" "}
                        <div className={styles.buttonclsmain}>
                          {keyWords?.map((data, key) => (
                            <button key={key}>
                              {data}{" "}
                              <span onClick={() => removeSelectedKeyword(data)}>
                                <CloseIcon />
                              </span>{" "}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      label="Cover Photo Alt Tag*"
                      placeholder="Type your cover-Photo alt tag"
                      onChange={handleChange}
                      name="coverPhotoAltTag"
                      value={inputValue?.coverPhotoAltTag}
                      errorMessage={errors?.coverPhotoAltTag}
                    />
                  </div>
                </div>
                <div className={styles.gridItems}>
                  <div className={styles.spacer}>
                    <Input
                      icon={LinkIcon}
                      label="Instagram"
                      placeholder="https://www.instagram.com/"
                      onChange={handleChange}
                      errorMessage={errors?.instagramLink}
                      name="instagramLink"
                      value={inputValue?.instagramLink}
                    />
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      icon={LinkIcon}
                      label="Facebook"
                      placeholder="https://www.facebook.com/"
                      onChange={handleChange}
                      name="facebookLink"
                      errorMessage={errors?.facebookLink}
                      value={inputValue?.facebookLink}
                    />
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      icon={LinkIcon}
                      label="LinkedIn"
                      placeholder="https://www.linkedin.com/"
                      onChange={handleChange}
                      name="linkedinLink"
                      errorMessage={errors?.linkedinLink}
                      value={inputValue?.linkedinLink}
                    />
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      icon={LinkIcon}
                      label="Twitter"
                      placeholder="https://www.twitter.com/"
                      onChange={handleChange}
                      name="twitterLink"
                      errorMessage={errors?.twitterLink}
                      value={inputValue?.twitterLink}
                    />
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      icon={LinkIcon}
                      label="Youtube"
                      placeholder="https://www.youtube.com/"
                      onChange={handleChange}
                      name="youtubeLink"
                      errorMessage={errors?.youtubeLink}
                      value={inputValue?.youtubeLink}
                    />
                  </div>
                  <div className={styles.spacer}>
                    <Input label="Meta Title*" placeholder="Type your MetaTitle" onChange={handleChange} name="metaTitle" value={inputValue?.metaTitle} errorMessage={errors?.metaTitle} />
                  </div>
                  <div className={styles.spacer}>
                    <Input
                      label="Meta Description*"
                      placeholder="Type your MetaDescription"
                      onChange={handleChange}
                      name="metaDescription"
                      value={inputValue?.metaDescription}
                      errorMessage={errors?.metaDescription}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.coverPhoto}>
                <label>Add Cover Photo*</label>
                <input type="file" onChange={handleImageChange} accept="image/*" style={{ display: "none" }} ref={fileInputRef} />
                {coverPhotoPreview ? (
                  <>
                    <div className={styles.uploadBox} style={{ height: "auto" }}>
                      <img src={coverPhotoPreview} alt="Cover Preview" style={{ width: "auto", height: "auto" }} />
                    </div>
                    <div className={styles.removeIcon}>
                      <button onClick={removeCoverImage}>
                        Remove Cover image
                        <CloseIcon />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.uploadBox} style={{ height: "450px" }} onClick={handleImageUpload}>
                    <div>
                      <div className={styles.centeralignmentIcon}>
                        <GalleryIcon />
                      </div>
                      <p>
                        <span>Click to upload</span> or drag and drop
                      </p>
                    </div>
                  </div>
                )}
                {errors?.coverPhoto ? <ShowError errorMessage={errors?.coverPhoto} /> : null}
              </div>
              <div className={styles.editorStyle}>
                <SunEditor
                  setOptions={{
                    buttonList: BUTTON_LIST,
                    minHeight: "300px",
                    maxHeight: "700px",
                  }}
                  // ref={sunEditorRef}
                  onChange={handleOnChange}
                  setContents={editorValue}
                  placeholder="Write a detailed description of your tool"
                  name="description"
                />
                {errors?.description ? <ShowError errorMessage={errors?.description} /> : null}
              </div>
            </div>
            <div className={styles.submitButtons}>
              <button className={styles.PublishButtons} onClick={()=>{
                if (updateId) {
                  handleSubmitBlog("Pending")
                }else{
                  handlePublishClick()
                }
              }
              }>
                <PublishIcon />
                {updateId ? "Update" : "Publish"} {updateId && loading?.publish ? <Loader /> : null}
              </button>
              {updateId ? (
                updateBlogData?.status == "Draft" ? (
                  <button className={styles.WhiteButtons} onClick={() => handleSubmitBlog("Draft")}>
                    <DraftIcon />
                    {updateId ? "Update" : "Save"} Draft {loading.draft ? <Loader blackLoader /> : null}
                  </button>
                ) : null
              ) : (
                <button disabled={loading?.draft} className={styles.WhiteButtons} onClick={() => handleSubmitBlog("Draft")}>
                  <DraftIcon />
                  {updateId ? "Update" : "Save"} Draft {loading.draft ? <Loader blackLoader /> : null}
                </button>
              )}
              <button onClick={handlePreviewModal} className={styles.WhiteButtons}>
                <PreviewIcon />
                Preview
              </button>
            </div>
          </div>
        </div>
      )}
      {blogPaymentModal && (
        <div className={styles.blogConfimModal}>
          <div className={styles.blogModalContent}>
            <div className={styles.close} onClick={() => setBlogPaymentModal(false)}>
              <ModalCloseIcon />
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
                <button disabled={loading.publish} onClick={() => handleSubmitBlog("Pending")} type="button">
                  Select {loading?.publish ? <Loader /> : null}
                </button>
              </div>
              <div className={styles.blogModalCostBox}>
                <h3>
                  $0.99 <span>Per Blog</span>
                </h3>
                <div className={styles.blogModalBoxCheck}>
                  <img src={trueIcon} alt="Logo" />
                  <p>Instant publish</p>
                </div>
                <button disabled={loading?.instantPublish} onClick={() => handleSubmitBlog("Pending", true)} type="button">
                  Select {loading?.instantPublish ? <Loader /> : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

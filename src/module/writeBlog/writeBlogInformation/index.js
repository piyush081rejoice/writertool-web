  import React, {  useEffect, useRef, useState } from "react";
  import styles from "./writeBlogInformation.module.scss";
  import WaveIcon from "@/assets/icons/waveIcon";
  import Input from "@/shared/components/input";
  import GalleryIcon from "@/assets/icons/galleryIcon";
  import { useOnChange } from "@/hooks/onChangeHook";
  import classNames from "classnames";
  import DownArrow from "@/assets/icons/downArrow";
  import CloseIcon from "@/assets/icons/crosearrow";
  import toast from "react-hot-toast";
  import ShowError from "@/common/ShowError";
  import dynamic from "next/dynamic";
  import "suneditor/dist/css/suneditor.min.css";
  import { BUTTON_LIST } from "@/helpers/Constant";
  import { ApiPost } from "@/helpers/API/ApiData";
  import { isEmpty } from "@/hooks/isEmpty";
  import { validateUrl } from "@/hooks/validateUrl";
  import PublishIcon from "@/assets/icons/Publish";
  import DraftIcon from "@/assets/icons/Draft";
  import PreviewIcon from "@/assets/icons/Preview";
  import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import OnClickOutside from "@/hooks/useClickOutside";
  const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

  export default function WriteBlogInformation({ getBlogCategoryData ,updateId ,updateBlogData  }) {
    const { inputValue, handleChange, setInputValue, errors, setErrors } = useOnChange({youtubeLink:"", twitterLink:"", linkedinLink:"", facebookLink:"", instagramLink:"",websiteLink:""});
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState({ publish: false, draft: false });
    const [selectedBlogs, setSelectedBlogs] = useState([]);
    const [keyWords, setKeyWords] = useState([]);
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
    const [editorValue, setEditorValue] = useState("");
    const [allBlogs, setAllBlogs] = useState(getBlogCategoryData);
    const fileInputRef = useRef(null);
    const sunEditorRef = useRef(null);
    const router =useRouter()
    const dropDownRef =useRef(null)
    const toggleDropDown =( )=> setShowDropdown(false)
    OnClickOutside([dropDownRef], toggleDropDown )
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
      if (isEmpty(inputValue?.sortDescription)) {
        formIsValid = false;
        updatedError["sortDescription"] = "Please provide a short Description.";
      }
      if (isEmpty(inputValue?.coverPhoto)) {
        formIsValid = false;
        updatedError["coverPhoto"] = "Please upload cover photo.";
      }
      if (isEmpty(editorValue)) {
        formIsValid = false;
        updatedError["description"] = "Please enter description.";
      }
      const socialMediaFields = ["youtubeLink", "twitterLink", "linkedinLink", "facebookLink", "instagramLink","websiteLink"];

      socialMediaFields.forEach(field => {      
        if (inputValue[field]?.length  && !validateUrl(inputValue[field], field, updatedError)) {
          formIsValid = false;
        }
      });
      setErrors(updatedError);
      return formIsValid;
    };

    const handleSubmitBlog = async (status) => {
      if (validateForm()) {
        setLoading(status === "Draft" ? { publish: false, draft: true } : { publish: true, draft: false });
      let formData = new FormData();
        try {
          formData.append("title", inputValue?.title);
          formData.append("sortDescription", inputValue?.sortDescription);
          formData.append("description", editorValue);
          formData.append("coverPhoto", inputValue?.coverPhoto);
          selectedBlogs.forEach((category, index) => {
            formData.append(`blogCategoryId[${index}]`, category?._id);
          });
          if (keyWords.length>0) {
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
          }else if (status === "Pending"){
            formData.append("status", status);
          }
          const res = await ApiPost(updateId ? `blog-services/blogs/update/${updateId}` :  "blog-services/blogs/create", formData, { "Content-Type": "multipart/form-data" });
          if (res?.data?.success) {            
            if (updateId) {
              toast.success(res?.data?.payload?.message || "Your blog has been successfully updated.")
            }else{
              toast.success(res?.data?.payload?.message || "Your blog has been submitted for approval.")
            }
            setInputValue({youtubeLink:"", twitterLink:"", linkedinLink:"", facebookLink:"", instagramLink:"",slugId:"",websiteLink:"",title:"",coverPhoto:""})
            setKeyWords([])
            setSelectedBlogs([])
            setCoverPhotoPreview(null)
            setEditorValue("")
            router.push("/your-stories")
          }
        } catch (error) {
          toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
        }finally {
          setLoading({ publish: false, draft: false });
        }
      }
    };
    const urlToFile = async (url, filename, mimeType) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], filename, { type: mimeType });
    };
    
    useEffect(() => {
      if (updateId) {
        setInputValue({sortDescription:updateBlogData?.sortDescription ?updateBlogData?.sortDescription :"",youtubeLink:updateBlogData?.youtubeLink ?updateBlogData?.youtubeLink :"" , twitterLink:updateBlogData?.twitterLink ?updateBlogData?.twitterLink :"", linkedinLink:updateBlogData?.linkedinLink ?updateBlogData?.linkedinLink :"", facebookLink:updateBlogData?.facebookLink ?updateBlogData?.facebookLink :"", instagramLink:updateBlogData?.instagramLink ?updateBlogData?.instagramLink :"",slugId:updateBlogData?.slugId ?updateBlogData?.slugId :"",websiteLink:updateBlogData?.websiteLink ?updateBlogData?.websiteLink :"",title:updateBlogData?.title ?updateBlogData?.title :"",coverPhoto:""})
        setCoverPhotoPreview(updateBlogData?.coverPhoto ?updateBlogData?.coverPhoto :null)
        const extractFilenameFromUrl = (url) => {
          const parsedUrl = new URL(url);
          const pathname = parsedUrl.pathname;
          const segments = pathname.split('/');
          return segments[segments.length - 1];
        };
        const filename = extractFilenameFromUrl(updateBlogData?.coverPhoto);
        const mimeType = "image/jpeg"; 
        urlToFile(updateBlogData.coverPhoto, filename, mimeType).then(file => {
          setInputValue((prevValue) => ({ ...prevValue, coverPhoto: file }));
        });
        setKeyWords(updateBlogData?.keyWords? updateBlogData?.keyWords :null)
        setSelectedBlogs(getBlogCategoryData?.filter((data) =>updateBlogData?.blogCategoryId?.some((categoryObj) => categoryObj?._id === data?._id)));
        setAllBlogs(getBlogCategoryData?.filter((item) => !updateBlogData?.blogCategoryId?.some((categoryObj) => categoryObj?._id === item?._id)));
        setEditorValue(updateBlogData?.description?updateBlogData?.description:"")

      }
    }, [])
    

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

    const handleOnKeyWordChange =()=>{
      if (keyWords.includes(inputValue?.Keywords)) {
        toast.error("The same keywords cannot be added. Please try again with different keywords.")
      }else{
        setKeyWords((prevKeyword)=>([...prevKeyword,inputValue?.Keywords]))
        setInputValue((prevKeyword)=>({...prevKeyword,Keywords:""}))
        
      }
    }

    const handleOnValueChange = (e) =>{
      setInputValue((prevKeyword)=>({...prevKeyword,slugId: e.target.value?.toLowerCase()}))
      setErrors((prevErrors) => ({ ...prevErrors, slugId: "" }));

    }

    return (
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
                    <div className={styles.relative} ref={dropDownRef} >
                      <input style={{ cursor: "pointer" }} readOnly type="text" value={"Select blog category from below"} onClick={()=>setShowDropdown(!showDropdown)} />
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
                  <Input label="Website URL" placeholder="Type your url..." onChange={handleChange} name="websiteLink" value={inputValue?.websiteLink}  errorMessage={errors?.websiteLink} />
                </div>
                <div className={styles.spacer}>
                  <Input label="Slug URL" placeholder="Type your slug url..." onChange={handleOnValueChange} name="slugId" value={inputValue?.slugId} errorMessage={errors?.slugId} />
                </div>
                <div className={styles.spacer}>
                  <Input label="Short Description" placeholder="Type your Short Description..." onChange={handleChange} name="sortDescription" value={inputValue?.sortDescription} errorMessage={errors?.sortDescription} />
                </div>
                <div className={styles.spacer}>
                  <Input button={"Add Keyword"} label="Keywords" placeholder="Type your Keywords ..." onChange={handleChange} name="Keywords" value={inputValue?.Keywords}  onButtonClick={inputValue?.Keywords && handleOnKeyWordChange} />
                  {keyWords.length > 0 ? <div style={{marginTop:"5px"}}> <div className={styles.buttonclsmain}>
                        {keyWords?.map((data, key) => (
                          <button key={key}>
                            {data}{" "}
                            <span onClick={() => removeSelectedKeyword(data)}>
                              <CloseIcon />
                            </span>{" "}
                          </button>
                        ))}
                      </div></div> :null}
                </div>
              </div>
              <div className={styles.gridItems}>
                <div className={styles.spacer}>
                  <Input label="Instagram" placeholder="www.instagram.com" onChange={handleChange} errorMessage={errors?.instagramLink} name="instagramLink"  value={inputValue?.instagramLink}  />
                </div>
                <div className={styles.spacer}>
                  <Input label="Facebook" placeholder="www.facebook.com" onChange={handleChange} name="facebookLink" errorMessage={errors?.facebookLink} value={inputValue?.facebookLink} />
                </div>
                <div className={styles.spacer}>
                  <Input label="LinkedIn" placeholder="www.linkdin.com" onChange={handleChange} name="linkedinLink" errorMessage={errors?.linkedinLink} value={inputValue?.linkedinLink} />
                </div>
                <div className={styles.spacer}>
                  <Input label="Twitter" placeholder="www.twitter.com" onChange={handleChange} name="twitterLink" errorMessage={errors?.twitterLink} value={inputValue?.twitterLink} />
                </div>
                <div className={styles.spacer}>
                  <Input label="Youtube" placeholder="www.youtube.com" onChange={handleChange} name="youtubeLink" errorMessage={errors?.youtubeLink} value={inputValue?.youtubeLink} />
                </div>
              </div>
            </div>
            <div className={styles.coverPhoto}>
              <label>Add Cover Photo*</label>
              <input type="file" onChange={handleImageChange} accept="image/*" style={{ display: "none" }} ref={fileInputRef} />
              {coverPhotoPreview ? (
                <>
                  <div className={styles.uploadBox} style={{height:"auto"}} >
                    <img src={coverPhotoPreview} alt="Cover Preview" style={{ width: "auto", height: "auto", }} />
                  </div>
                  <div className={styles.removeIcon}>
                    <button onClick={removeCoverImage}>Remove Cover image<CloseIcon /></button>
                  </div>
                </>
              ) : (
                <div className={styles.uploadBox} style={{height:"450px"}} onClick={handleImageUpload}>
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
                  minHeight:"300px",
                  maxHeight:"700px"
                }}
                ref={sunEditorRef}
                onChange={handleOnChange}
                setContents={editorValue}
                placeholder="Write a detailed description of your tool"
                name="description"
              />
              {errors?.description ? <ShowError errorMessage={errors?.description} /> : null}
            </div>
          </div>
          <div className={styles.submitButtons}>
            <button disabled={loading.publish} className={styles.PublishButtons} onClick={()=>handleSubmitBlog("Pending")}><PublishIcon/>{updateId ? "Update":"Publish"} {loading?.publish ? <Loader /> :null}</button>
            {updateId ?  updateBlogData?.status == "Draft" ? <button className={styles.WhiteButtons}  onClick={()=>handleSubmitBlog("Draft")}><DraftIcon/>{updateId ? "Update":"Save"} Draft {loading.draft ? <Loader blackLoader /> :null}</button>  : null  :<button disabled={loading?.draft} className={styles.WhiteButtons}  onClick={()=>handleSubmitBlog("Draft")}><DraftIcon/>{updateId ? "Update":"Save"} Draft {loading.draft ? <Loader blackLoader /> :null}</button> }
            <button className={styles.WhiteButtons}  ><PreviewIcon/>Preview</button>
          </div>
        </div>
      </div>
    );
  }

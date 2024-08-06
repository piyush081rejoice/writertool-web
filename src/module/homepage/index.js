import { getCookie } from "@/hooks/useCookie";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const CustomizeyourOrganization = dynamic(() => import("@/shared/components/customizeyourOrganization"));
const EditorsPick = dynamic(() => import("./editorsPick"));
const FrequentlyAskedQuestions = dynamic(() => import("./frequentlyAskedQuestions"));
const HeroBanner = dynamic(() => import("./heroBanner"));
const LatestPosts = dynamic(() => import("./latestPosts"));
import { ApiGet } from "@/helpers/API/ApiData";
import toast from "react-hot-toast";
import useDebounce from "@/helpers/useDebounce";

const HomePage = ({ getBlogCategoryData, getBlogsData, getTrendingBlogData, onLoadMore, isLoadMoreDisabled, blogDataLoading ,handleGetBlogsData }) => {
  const [isOnBoardingComplete, setIsOnBoardingComplete] = useState(false);
  const [showBlogs, setShowBlogs] = useState(getBlogCategoryData);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debouncedSearch = useDebounce(searchKeyWord, 300);
  useEffect(() => {
    const userTokenFromCookie = getCookie("userToken");
    const isProfileCompleted = getCookie("isProfileCompleted");
    if (userTokenFromCookie !== undefined) {
      if (JSON.parse(isProfileCompleted)) {
        setIsOnBoardingComplete(false);
      } else {
        setIsOnBoardingComplete(true);
      }
    }
  }, []);
  
  useEffect(() => {
    if (debouncedSearch) {
      handleBlogSearchCategory();
    }else{
      setShowBlogs(getBlogCategoryData)
    }
  }, [debouncedSearch,]);

  const handleBlogSearchCategory = async () => {
    try {
      const response = await ApiGet(`blog-services/blog-categories/get?isActive=true${debouncedSearch?`&search=${debouncedSearch}`  :``}`);
      const data = response?.data?.payload?.blog_category;
      if (response?.data?.payload?.blog_category?.length>0) {
        setShowBlogs(data);
      }else{
        setShowBlogs([])
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isOnBoardingComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOnBoardingComplete]);

  return (
    <div>
      <HeroBanner {...{ showBlogs ,searchKeyWord, setSearchKeyWord }} />
      <EditorsPick {...{ getBlogsData, getTrendingBlogData }} />
      {getBlogsData?.length > 5 ?
         <LatestPosts getBlogCategoryData={getBlogCategoryData} handleGetBlogsData={handleGetBlogsData} getBlogsData={getBlogsData} onLoadMore={onLoadMore} isLoadMoreDisabled={isLoadMoreDisabled} blogDataLoading={blogDataLoading} />  
       :null}
      
      <FrequentlyAskedQuestions />
      {isOnBoardingComplete && <CustomizeyourOrganization setIsOnBoardingComplete={setIsOnBoardingComplete} />}
    </div>
  );
};

export default HomePage;

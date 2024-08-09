import { getCookie } from "@/hooks/useCookie";
import { useEffect, useState } from "react";
import { ApiGet } from "@/helpers/API/ApiData";
import useDebounce from "@/helpers/useDebounce";
import CustomizeyourOrganization from "@/shared/components/customizeyourOrganization";
import toast from "react-hot-toast";
import EditorsPick from "./editorsPick";
import FrequentlyAskedQuestions from "./frequentlyAskedQuestions";
import HeroBanner from "./heroBanner";
import LatestPosts from "./latestPosts";

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

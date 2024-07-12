import { getCookie } from "@/hooks/useCookie";
import CustomizeyourOrganization from "@/shared/components/customizeyourOrganization";
import { useEffect, useState } from "react";
import EditorsPick from "./editorsPick";
import FrequentlyAskedQuestions from "./frequentlyAskedQuestions";
import HeroBanner from "./heroBanner";
import LatestPosts from "./latestPosts";

const HomePage = ({getBlogCategoryData,getBlogsData,getTrendingBlogData}) => {
  const [isOnBoardingComplete, setIsOnBoardingComplete] = useState(false);


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
    if (isOnBoardingComplete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOnBoardingComplete])

  return (
    <div>
      <HeroBanner {...{getBlogCategoryData}} />
      <EditorsPick {...{getBlogsData ,getTrendingBlogData}} />
      <LatestPosts {...{getBlogsData}}  />
      <FrequentlyAskedQuestions />
      {isOnBoardingComplete && <CustomizeyourOrganization  setIsOnBoardingComplete={setIsOnBoardingComplete} />}
      {/* <ChangePassword/> */}
      {/* <DeleteBlog/> */}
      {/* <LogoutModal/> */}
    </div>
  );
};

export default HomePage;

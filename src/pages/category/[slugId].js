import { formatTitleCase } from "@/common";
import NextSEO from "@/common/NextSeo";
import { ApiGet, ApiGetNoAuth } from "@/helpers/API/ApiData";
import { CATEGORY_IMAGES, CATEGORY_PAGE_URL, EXTERNAL_DATA_URL } from "@/helpers/Constant";
import Category from "@/module/category";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const UpdateBlog = ({ seoData }) => {
  const router = useRouter();
  const { slugId } = router?.query;
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [isTrendingBlogsData, setIsTrendingBlogsData] = useState([]);

  useEffect(() => {
    if (!slugId) return;

    const fetchData = async () => {
      try {
        // Fetch Blog Categories
        const blogCategoryDataResponse = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50");
        setBlogCategoryData(blogCategoryDataResponse?.data?.payload?.blog_category || []);

        // Fetch Trending Blogs
        const trendingBlogsResponse = await ApiGetNoAuth("blog-services/blogs/get?isTrending=true&skip=1&limit=3");
        setIsTrendingBlogsData(trendingBlogsResponse?.data?.payload?.blogs || []);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [slugId]);

  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <Category {...{ getBlogCategoryData: blogCategoryData, slugId, isTrendingBlogsData }} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slugId } = context.params;

  const seoData = {
    Title: `${formatTitleCase(slugId)} Category | WriterTools`,
    Description: `Explore insightful blogs in the ${slugId} category on WriterTools.`,
    url: `${EXTERNAL_DATA_URL}/category/${slugId}`,
    KeyWords: `${formatTitleCase(slugId)}, category `,
    OG_Img: CATEGORY_IMAGES[slugId] || CATEGORY_PAGE_URL,
    OG_Img_alt_tag: formatTitleCase(slugId),
  };

  return {
    props: {
      seoData,
    },
  };
}

export default UpdateBlog;

import { ApiGet } from '@/helpers/API/ApiData';
import Category from '@/module/category'
import React from 'react'

export default function index({getBlogCategoryData}) {
  return (
    <div>
        <Category {...{ getBlogCategoryData }} />
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const blogCategoryData = await ApiGet("blog-services/blog-categories/get?isActive=true&skip=1&limit=50").then((resp) => resp?.data?.payload);
    return {
      props: {
        getBlogCategoryData: blogCategoryData?.blog_category,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "faceing error",
      },
    };
  }
}

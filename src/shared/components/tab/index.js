import React, { useState, useEffect } from "react";
import styles from "./tab.module.scss";
import Slider from "react-slick";
import Explore from "@/assets/icons/Explore";
import { useRouter } from "next/router";

function SampleNextArrow(props) {
  const { onClick, disabled } = props;
  return (
    <div className={`${styles.rightArrow} ${disabled ? styles.disabled : ""}`} onClick={!disabled ? onClick : null}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M15.7668 11.5707C16.0777 11.2598 16.0777 10.7403 15.7668 10.4286L8.59281 3.23618C8.2779 2.92127 7.76721 2.92127 7.4531 3.23618C7.1382 3.55108 7.1382 4.06257 7.4531 4.37748L14.0572 11L7.4523 17.6217C7.1374 17.9374 7.1374 18.4481 7.4523 18.7638C7.76721 19.0787 8.2779 19.0787 8.59201 18.7638L15.7668 11.5707Z"
          fill="#292D36"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick, disabled } = props;
  return (
    <div className={`${styles.leftArrow} ${disabled ? styles.disabled : ""}`} onClick={!disabled ? onClick : null}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M15.7668 11.5707C16.0777 11.2598 16.0777 10.7403 15.7668 10.4286L8.59281 3.23618C8.2779 2.92127 7.76721 2.92127 7.4531 3.23618C7.1382 3.55108 7.1382 4.06257 7.4531 4.37748L14.0572 11L7.4523 17.6217C7.1374 17.9374 7.1374 18.4481 7.4523 18.7638C7.76721 19.0787 8.2779 19.0787 8.59201 18.7638L15.7668 11.5707Z"
          fill="#292D36"
        />
      </svg>
    </div>
  );
}

export default function Tab({ getBlogCategoryData }) {
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [slider, setSlider] = useState(null);
  const router = useRouter()
  const totalSlides = getBlogCategoryData ? getBlogCategoryData?.length : 0;
  const slidesToShow = 4;
  const slidesToScroll = 3;

  const NavSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    variableWidth: false,
    nextArrow: <SampleNextArrow disabled={isNextDisabled} />,
    prevArrow: <SamplePrevArrow disabled={isPrevDisabled} />,
    adaptiveHeight: false,
    afterChange: (current) => {
      const lastVisibleSlide = current + slidesToShow;
      setIsPrevDisabled(current === 0);
      setIsNextDisabled(lastVisibleSlide >= totalSlides);
    },
  };

  useEffect(() => {
    setIsNextDisabled(totalSlides <= slidesToShow);
  }, [totalSlides, slidesToShow]);

  useEffect(() => {
    if (slider) {
      const lastVisibleSlide = slider.innerSlider.state.currentSlide + slidesToShow;
      setIsNextDisabled(lastVisibleSlide >= totalSlides);
    }
  }, [slider, totalSlides, slidesToShow]);

  return (
    <div className={styles.sliderTabDesign}>
      <div className="container">
        <div className="tab">
          <Slider ref={(c) => setSlider(c)} {...NavSlider}>
            <button style={{ color: "white" }}  onClick={()=>router.push("/category")}>
              <Explore /> Explore Topics
            </button>
            {getBlogCategoryData?.map?.((data, index) => (
              <button key={index} onClick={()=>router.push(`/category/${data?.slugId}`)}>{data?.title}</button>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import classes from "./Carousel.module.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Container } from "react-bootstrap";
import { Button } from "../Button";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

export default function Carousel({
  slides,
  title,
  description,
  header,
  slidesPerView,
  spaceBetween = 20,
  showNavigation = false,
  showPagination = false,
  navigationColor,
  speed,
  autoplay,
  loop,
  centeredSlides,
  textColor,
  swiperMaxWidth,
  breakpoints,
  navigationOnRight = false,
  navigationOnLeft = false,
  isCustomNavigation = false,
  btnPrevClass,
  btnNextClass,
  customNavigationStyle,
  customStyle,
  customPagination,
}) {
  const swiperRef = useRef();
  return (
    <>
      {(title || description) && (
        <div className={classes.headings} style={{ "--text-color": textColor }}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}

      {header && header}
      <div
        className={`${classes.carouselWrapper} ${
          swiperMaxWidth ? classes.maxWidthEnable : ""
        }`}
        style={{ "--max-width": swiperMaxWidth }}
      >
        {isCustomNavigation && (
          <div
            className={`${btnPrevClass && btnPrevClass} ${
              classes._buttonsDiv
            } ${classes._btnPrev}`}
          >
            <Button
              className={classes.btnRef}
              onClick={() => swiperRef?.current?.slidePrev()}
              customStyle={customNavigationStyle}
            >
              <MdOutlineChevronLeft />
            </Button>
          </div>
        )}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={showNavigation}
          speed={speed && speed}
          autoplay={autoplay && autoplay}
          loop={loop && loop}
          modules={[Navigation, Pagination, Autoplay]}
          centeredSlides={centeredSlides && centeredSlides}
          autoHeight
          pagination={
            showPagination
              ? {
                  clickable: true,
                  renderBullet: customPagination && customPagination,
                }
              : false
          }
          className={`${classes.carouselSwiper} ${
            showPagination ? classes.hasPagination : ""
          } ${showNavigation ? classes.hasNavigation : ""} ${
            navigationOnRight ? classes.navigationOnRight : ""
          } ${navigationOnLeft ? classes.navigationOnLeft : ""}`}
          slidesPerView={slidesPerView}
          style={{
            "--swiper-pagination-bullet-inactive-color":
              "rgb(255 255 255/ 0.5)",
            "--swiper-pagination-bullet-width": "60px",
            "--swiper-pagination-bullet-height": "2px",
            "--swiper-pagination-bullet-border-radius": "2px",
            "--swiper-navigation-color": "var(--secondary-text-color)",
            "--btn-color": navigationColor,
            "--disabled-btn-color": navigationColor ? "transparent" : "#C4C4C4",
            ...(navigationColor && {
              "--border": "1px solid var(--white-color)",
            }),
            ...customStyle,
          }}
          {...(breakpoints !== null && {
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: spaceBetween,
              },
              ...breakpoints,
            },
          })}
        >
          {slides?.length !== 0 &&
            Array.isArray(slides) &&
            slides?.map((item, index) => (
              <SwiperSlide key={index}>{item}</SwiperSlide>
            ))}
        </Swiper>
        {isCustomNavigation && (
          <div
            className={`${btnNextClass && btnNextClass} ${
              classes._buttonsDiv
            } ${classes._btnNext}`}
          >
            <Button
              className={classes.btnRef}
              onClick={() => swiperRef?.current?.slideNext()}
              customStyle={customNavigationStyle}
            >
              <MdOutlineChevronRight />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

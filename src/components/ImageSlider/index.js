import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ImageSlider.css";
import RenderComponent from "../RenderComponent";

export default function ImageSlider({
  gallery,
  imageHeight,
  customStyle,
  mediaStyle,
  imageIndex = 0,
  setImageIndex,
}) {
  return (
    <>
      <style>
        {`
        .slider_modal .swiper-button-prev{
          color:#f1af16;
          border: 0px !important;
        }
        .slider_modal .swiper-button-next{
          border: 0px !important;
        }
        `}
      </style>

      <div className="slider_modal">
        <Swiper
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          initialSlide={imageIndex}
          onSlideChange={(swiper) => {
            setImageIndex(swiper?.activeIndex);
          }}
        >
          {gallery?.map((elem, index) => {
            return (
              <SwiperSlide key={index}>
                <RenderComponent
                  elem={elem}
                  imageHeight={imageHeight}
                  mediaStyle={mediaStyle}
                  customStyle={customStyle}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

import React from "react";
import classes from "./RenderComponent.module.css";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillEye, AiFillFileWord } from "react-icons/ai";
import { imageUrl, mediaUrl } from "../../config/apiUrl";
const RenderComponent = ({ elem, imageHeight, mediaStyle, customStyle }) => {
  const extension = elem?.name?.split(".").pop();

  return (
    <>
      <div
        className={
          ["jfif", "png", "jpg", "jpeg", "avif", "gif"].includes(extension)
            ? classes.image_box
            : ["pdf", "document", "docx", "doc"].includes(extension)
            ? classes.pdf_box
            : classes.video_box
        }
        style={{
          height: imageHeight || "450px",
          ...customStyle,
        }}
      >
        {["jfif", "png", "jpg", "jpeg", "avif", "gif"].includes(extension) ? (
          <img
            style={{
              ...mediaStyle,
            }}
            src={imageUrl(elem?.key)}
            alt="..."
          />
        ) : ["pdf"].includes(extension) ? (
          <div className={classes.pdfView}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                window?.open(mediaUrl(elem?.key), "_blank");
              }}
            >
              <AiFillEye color="var(--white-color)" size={22} />
            </span>
            <div>
              <BsFileEarmarkPdfFill size={50} color={`#ff1300`} />
              <p>{elem?.name}</p>
            </div>
          </div>
        ) : ["document", "docx", "doc"]?.includes(extension) ? (
          <div className={classes.pdfView}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                window?.open(mediaUrl(elem?.key), "_blank");
              }}
            >
              <AiFillEye color="var(--white-color)" size={22} />
            </span>
            <div>
              <AiFillFileWord size={50} color={`#004db3`} />
              <p>{elem?.name}</p>
            </div>
          </div>
        ) : (
          <video
            style={{
              ...mediaStyle,
            }}
            src={mediaUrl(elem?.key)}
            controls
            height="100%"
            width="100%"
          ></video>
        )}
      </div>
    </>
  );
};

export default RenderComponent;

import React from "react";
import classes from "./RenderDocument.module.css";
import { PiDownloadLight } from "react-icons/pi";
import pdfImg from "@/assets/images/pdf-image.png";
import { downloadFileFromUrl } from "@/Helper/HelperFunction";
import { DocIcon, ImageIcon } from "@/constant/imagePath";
import { imageTypes } from "@/data/constants";
import { imageUrl } from "@/config/apiUrl";

const RenderDocument = ({ value, label }) => {
  const extension = value?.type?.split(".")?.pop() || value?.split(".").pop();
  // const label = value?.name?.split(".")?.shift() || value?.split(".")?.shift();
  return (
    <>
      <div className={classes.documentDiv}>
        <div className={classes.documentLeft}>
          {imageTypes?.includes(extension) ? (
            <img src={ImageIcon} />
          ) : extension === "pdf" ? (
            <img src={pdfImg} />
          ) : (
            <img src={DocIcon} />
          )}
          <p>{label}</p>
        </div>
        <div
          className={classes.documentRight}
          onClick={() => {
            downloadFileFromUrl(imageUrl(value), `${label}.${extension}`);
          }}
        >
          <PiDownloadLight />
        </div>
      </div>
    </>
  );
};

export default RenderDocument;

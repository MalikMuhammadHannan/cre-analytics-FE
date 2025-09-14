import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import ImageSlider from "../../components/ImageSlider";
import { imageUrl, mediaUrl } from "../../config/apiUrl";
import { downloadFileFromUrl } from "../../Helper/HelperFunction";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./ImageSliderModal.module.css";
const ImageSliderModal = ({
  show,
  setShow,
  gallery,
  imageIndex,
  setImageIndex,
}) => {
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        width={"800px"}
        // header={title}
        className={classes.modal}
        showCloseIcon={false}
      >
        <div className={classes.lightboxHeader}>
          <span
            onClick={() => {
              const extension = gallery[imageIndex]?.name?.split(".").pop();
              if (["jpg", "jpeg", "png", "avif", "gif"].includes(extension)) {
                downloadFileFromUrl(
                  imageUrl(gallery[imageIndex]?.key),
                  gallery[imageIndex]?.name
                );
              } else {
                downloadFileFromUrl(
                  mediaUrl(gallery[imageIndex]?.key),
                  gallery[imageIndex]?.name
                );
              }
            }}
          >
            <MdOutlineFileDownload size={30} color={"var(--white-color)"} />
          </span>
          <span onClick={() => setShow(false)}>
            <IoMdClose size={30} color={"var(--white-color)"} />
          </span>
        </div>
        {gallery?.length > 0 ? (
          <ImageSlider
            gallery={gallery}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
          />
        ) : (
          <div className={classes.notFound}>
            <h6>No attachments here</h6>
            <p>Start sharing files to see them here!</p>
          </div>
        )}
      </ModalSkeleton>
    </>
  );
};

export default ImageSliderModal;

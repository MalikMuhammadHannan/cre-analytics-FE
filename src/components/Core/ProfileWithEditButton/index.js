"use client";
import { imageUrl } from "@/config/apiUrl";
import { DefaultUserPhoto } from "@/constant/imagePath";
import { useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import classes from "./profilewitheditbutton.module.css";

export const ProfileWithEditButton = ({
  updateImage,
  setUpdateImage,
  isEdit,
}) => {
  const inputRef = useRef(null);
  return (
    <>
      <div className={`${classes.profileEditContainer}`}>
        {updateImage?.name ? (
          <div className={`${classes.profileEditImage_box}`}>
            <img
              // layout="fill"
              className={`${classes.profileEditImage}`}
              src={URL.createObjectURL(updateImage)}
            />
          </div>
        ) : updateImage == null ? (
          <div className={`${classes.profileEditImage_box}`}>
            <img
              // layout="fill"
              className={`${classes.profileEditImage}`}
              src={DefaultUserPhoto}
            />
          </div>
        ) : (
          typeof updateImage == "string" && (
            <div className={`${classes.profileEditImage_box}`}>
              <img
                // layout="fill"
                className={`${classes.profileEditImage}`}
                src={imageUrl(updateImage)}
                alt="profileImage"
              />
            </div>
          )
        )}

        {isEdit && (
          <div
            className={`${classes.profileEditPen_box}`}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <FaRegEdit
              className={`${classes.profileEditPen}`}
              color={"var(--white-color)"}
              size={11}
            />
            <input
              ref={inputRef}
              type="file"
              size="2000000"
              className={`${classes.file_upload_form3rd}`}
              onChange={(e) => {
                if (e.target.files?.length > 0) {
                  if (
                    ![
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "image/gif",
                    ].includes(e.target.files[0].type)
                  ) {
                    return toast.error(
                      "Please upload a valid image. [jpg and png formats only]"
                    );
                  }
                  // max size 2MB
                  if (e.target.files[0]?.size / 1024 / 1024 > 10)
                    return toast.error(
                      "Please upload a valid image. [Max size: 10MB]"
                    );

                  setUpdateImage(e.target.files[0]);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

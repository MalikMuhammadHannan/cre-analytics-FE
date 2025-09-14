"use client";
import React, { useRef } from "react";
import { MdModeEdit, MdPictureAsPdf } from "react-icons/md";
import { RiDeleteBinLine, RiFileExcel2Fill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { FaFileUpload, FaFileCsv, FaFileWord } from "react-icons/fa";
import classes from "./AttachmentUpload.module.css";
import { RxPlus } from "react-icons/rx";
import { BiVideo } from "react-icons/bi";
import { toast } from "react-toastify";
import { HiPlusSm } from "react-icons/hi";
import { Button } from "../Button";
import { imageUrl } from "@/config/apiUrl";
import { Spinner } from "react-bootstrap";

let docType =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function AttachmentUpload({
  state,
  setter,
  edit = true,
  label,
  onEdit,
  placeholder = "Upload File",
  onDelete,
  acceptedTypes = "*",
  uploading,
  fileSize = 5,
}) {
  const inputRef = useRef(null);
  const HandleUploadFile = (e) => {
    let fileType = e.target.files[0].type;
    fileType = fileType.split("/")[0];
    const fileSizeInBytes = e.target.files[0].size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    if (fileType == "image") {
      fileType = "image/*";
    }
    const allowedFileTypes = InputUploadType(acceptedTypes);

    if (acceptedTypes === "*" || allowedFileTypes?.includes(fileType)) {
      if (fileSizeInMegabytes < fileSize) {
        setter(e.target.files[0]);
      } else {
        toast.warn(`File size should not be greater than ${fileSize} mb`);
      }
    } else {
      toast.warn("Invalid file type");
    }
  };
  return (
    <div className={classes.box}>
      {label && <label className={classes.label}>{label}</label>}
      {state?.name || typeof state == "string" ? (
        <div className={classes.csvBox}>
          {uploading && (
            <div
              className={classes.loader_container}
              onClick={(e) => e.stopPropagation()}
            >
              <Spinner size="lg" variant="light" />
            </div>
          )}
          <RenderComp state={state} />
          {/* On Hover */}
          <div className={classes.viewBtnBox}>
            <Button
              leftIcon={<AiFillEye />}
              className={classes.icon}
              onClick={() =>
                window?.open(
                  typeof state == "object"
                    ? URL.createObjectURL(state)
                    : `${imageUrl(state)}`
                )
              }
            />
          </div>
          {/* On Hover */}

          <div className={classes.editAndDelete}>
            {onDelete && (
              <Button
                className={classes.icon}
                onClick={() => {
                  onDelete();
                }}
                leftIcon={<RiDeleteBinLine />}
              />
            )}
            {edit && (
              <Button
                className={classes.icon}
                onClick={() => {
                  inputRef.current.click();
                  if (onEdit) {
                    onEdit();
                  }
                }}
                leftIcon={<MdModeEdit />}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className={classes.csvBox}
          onClick={() => {
            edit && inputRef.current.click();
          }}
        >
          {edit ? (
            <>
              <span className={classes?.uploadText}> {placeholder}</span>
              <HiPlusSm color={"var(--gray-border)"} size={50} />
            </>
          ) : (
            <FaFileCsv color={"var(--main-color)"} size={50} />
          )}
        </div>
      )}
      {/* Input For Image Upload */}
      <input
        hidden
        type={"file"}
        ref={inputRef}
        onChange={(e) => HandleUploadFile(e)}
        accept={InputUploadType(acceptedTypes)}
      />
    </div>
  );
}

export default AttachmentUpload;

function RenderComp({ state }) {
  return (
    <>
      {((typeof state == "object"
        ? ["png", "jpeg", "jpg", "svg"].includes(state?.name?.split(".")[1])
        : ["png", "jpeg", "svg+xml", "jpg"].includes(state?.split(".")[1])) && (
        <img
          className={classes.img}
          src={
            typeof state == "object"
              ? URL.createObjectURL(state)
              : `${imageUrl(state)}`
          }
        />
      )) ||
        ((typeof state == "object"
          ? ["doc", "docx"].includes(state?.name?.split(".")[1])
          : state?.split(".")[1] == "docx") && (
          <FaFileWord className={classes.typeIcon} size={35} />
        )) ||
        ((typeof state == "object"
          ? ["xlsx"]?.includes(state?.name?.split(".")[1])
          : state?.split(".")[1] == "xlsx") && (
          <RiFileExcel2Fill className={classes.typeIcon} size={35} />
        )) ||
        ((typeof state == "object"
          ? ["pdf"]?.includes(state?.name?.split(".")[1])
          : state?.split(".")[1] == "pdf") && (
          <MdPictureAsPdf className={classes.typeIcon} size={35} />
        )) ||
        ((typeof state == "object"
          ? ["csv"]?.includes(state?.name?.split(".")[1])
          : state?.split(".")[1] == "csv") && (
          <FaFileCsv className={classes.typeIcon} size={35} />
        )) ||
        ((typeof state == "object"
          ? ["mp4"]?.includes(state?.name?.split(".")[1])
          : state?.split(".")[1] == "mp4") && (
          <BiVideo className={classes.typeIcon} size={35} />
        ))}
    </>
  );
}

const InputUploadType = (types) => {
  let modifiedTypes = types.split(",");
  let finalTypes = [];
  for (let key in modifiedTypes) {
    switch (modifiedTypes[key]) {
      case "image":
        finalTypes?.push("image/*");
        break;
      case "video":
        finalTypes?.push("video/*");
        break;
      case "pdf":
        finalTypes?.push("application/pdf");
        break;
      case "docx":
        finalTypes?.push(docType);
        break;
      default:
        finalTypes?.push("*");
        break;
    }
  }
  return finalTypes.join(",");
};

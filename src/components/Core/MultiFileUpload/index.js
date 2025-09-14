"use client";
import React, { useState } from "react";
import classes from "./MultiFileUpload.module.css";
import Dropzone from "react-dropzone";
import { IoCloseOutline } from "react-icons/io5";
import ReactPlayer from "react-player";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillEye, AiFillFileWord } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { imageUrl, mediaUrl } from "@/config/apiUrl";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Spinner } from "react-bootstrap";
import { Button } from "../Button";
import { FaUpload } from "react-icons/fa6";
import { imageTypes, videoTypes } from "@/data/constants";

const MultiFileUpload = ({
  label,
  files = [],
  setFiles,
  maxFiles = 10,
  acceptTypes = {
    "image/*": [".png", ".jpeg", ".jpg"],
    "video/*": [".mp4"],
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  text = "Drag and drop images here or click to select files",
  uploadBoxClass = "",
  noDrag,
  maxSize = 10000000,
  deletedFiles = [],
  setDeletedFiles,
  multiple = true,
  allowDrag = false,
  primaryImageStyle,
  uploading = false,
  onDelete,
}) => {
  const [_noClick, _setNoClick] = useState(false);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (destination.index === source.index) return;

    const reorderedFiles = [...files];
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);

    setFiles(reorderedFiles);

    setTimeout(() => {
      _setNoClick(false);
    }, 1000);
  };

  return (
    <div className={classes.fileInputDiv}>
      {label && <label>{label}</label>}
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={() => _setNoClick(true)}
      >
        <Dropzone
          maxSize={maxSize}
          noClick={_noClick}
          noDrag={noDrag}
          accept={acceptTypes}
          maxFiles={maxFiles}
          multiple={multiple}
          onDrop={(acceptedFiles) => {
            setFiles([...files, ...acceptedFiles]);
          }}
          onDropRejected={(rejectedFiles) => {
            rejectFilesError(rejectedFiles, maxSize, maxFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section
              className={[
                classes.main,
                files?.length > 0 && classes.isFiles,
                uploadBoxClass && uploadBoxClass,
              ].join(" ")}
              {...getRootProps()}
            >
              {/* {files?.length > 0 && (
                <button className={classes.uploadMoreBtn}>
                  <FiUpload
                    size={20}
                    color={'#fff'}
                  />
                </button>
              )} */}
              <input {...getInputProps()} />
              {files?.length == 0 ? (
                <div className={classes.section}>
                  <div className={classes.fileUploadOptions}>
                    <FaUpload size={30} color={"#000000b5"} />
                    <p>{text}</p>
                  </div>
                  <button>Upload Photo </button>
                </div>
              ) : (
                <Droppable droppableId="files" direction="horizontal">
                  {(droppableProvided) => (
                    <div
                      className={classes.imagesWrap}
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {files?.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={index?.toString()}
                          index={index?.toString()}
                          isDragDisabled={!allowDrag || typeof item == "object"}
                        >
                          {(draggableProvided) => (
                            <div
                              key={index}
                              className={classes.image}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              style={{
                                ...draggableProvided.draggableProps.style, // Existing styles
                                ...(index === 0 ? primaryImageStyle : {}), // Your conditional style
                              }}
                            >
                              <Button
                                className={classes.closeIconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newFiles = [...files];
                                  newFiles?.splice(index, 1);
                                  setFiles(newFiles);
                                  if (typeof item !== "object" && setDeletedFiles) {
                                    setDeletedFiles([...deletedFiles, item]);
                                  }
                                }}
                              >
                                <IoCloseOutline size={20} />
                              </Button>
                              {uploading && typeof item == "object" && (
                                <div className={classes.uploadingOverlay}>
                                  <Spinner animation="border" variant="white" />
                                </div>
                              )}
                              <RenderFileComponent item={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              )}
            </section>
          )}
        </Dropzone>
      </DragDropContext>
    </div>
  );
};

export default MultiFileUpload;

const RenderFileComponent = ({ item }) => {
  return (
    <>
      {(
        typeof item == "object"
          ? item?.type?.split("/")[0] === "image"
          : imageTypes?.includes(item?.split(".")[item?.split(".")?.length - 1])
      ) ? (
        <img
          src={
            typeof item == "string" ? imageUrl(item) : URL.createObjectURL(item)
          }
          alt=""
          draggable="false"
        />
      ) : (
          typeof item == "object"
            ? item?.type?.split("/")[0] === "video"
            : videoTypes?.includes(
                item?.split(".")[item?.split(".")?.length - 1]
              )
        ) ? (
        <ReactPlayer
          url={
            typeof item == "string" ? mediaUrl(item) : URL.createObjectURL(item)
          }
          playing={false}
          controls={true}
          width={"100%"}
          height={"100%"}
          className={classes.videoPlayer}
        />
      ) : (
          typeof item == "object"
            ? item?.type == "application/pdf"
            : ["pdf"]?.includes(item?.split(".")[item?.split(".")?.length - 1])
        ) ? (
        <div className={classes.pdfView}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                typeof item == "string"
                  ? mediaUrl(item)
                  : URL.createObjectURL(item),
                "_blank"
              );
            }}
          >
            <AiFillEye color="var(--white-color)" size={22} />
          </span>
          <div>
            <BsFileEarmarkPdfFill size={40} color={`#ff1300`} />
            <p>{typeof item == "string" ? item?.slice(7) : item?.name}</p>
          </div>
          {/* <iframe
            src={
              typeof item == "string"
                ? `https://2514-39-51-68-238.ngrok-free.app/api/v1/media/${item}`
                : URL.createObjectURL(item)
            }
            className={classes.pdfIframe}
            seamless="seamless"
            style={{
              overflow: "hidden",
            }}
          /> */}
        </div>
      ) : (
        (typeof item == "object"
          ? item?.type ==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : ["document", "docx", "doc"]?.includes(
              item?.split(".")[item?.split(".")?.length - 1]
            )) && (
          <div className={classes.pdfView}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  typeof item == "string"
                    ? mediaUrl(item)
                    : URL.createObjectURL(item),
                  "_blank"
                );
              }}
            >
              <AiFillEye color="var(--white-color)" size={22} />
            </span>
            <div>
              <AiFillFileWord size={40} color={`#004db3`} />
              <p>{typeof item == "string" ? item?.slice(7) : item?.name}</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

const rejectFilesError = (rejectedFiles, maxSize, maxFiles) => {
  for (let i = 0; i < rejectedFiles?.length; i++) {
    for (let j = 0; j < rejectedFiles?.[i]?.errors?.length; j++) {
      let code = rejectedFiles?.[i]?.errors?.[j]?.code;
      if (code === "file-too-large") {
        return toast.warn(
          `File size should be less than ${maxSize / 1000000}MB`
        );
      } else if (code === "file-invalid-type") {
        return toast.warn(`Invalid file format`);
      } else if (code === "too-many-files") {
        return toast.warn(`You can upload maximum ${maxFiles} files`);
      }
    }
  }
};

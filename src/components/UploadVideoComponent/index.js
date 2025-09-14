import classes from "./UploadVideoComponent.module.css";
import ReactPlayer from "react-player";
import { useRef } from "react";
import { Button } from "../Button/Button";
import { FaEdit } from "react-icons/fa";
import { FaPlay, FaUpload } from "react-icons/fa6";
import { Spinner } from "react-bootstrap";
import { imageUrl } from "../../config/apiUrl";

export default function UploadVideoComponent({
  label,
  value,
  setter,
  className,
  loading,
  variant = "bordered",
}) {
  const inputRef = useRef(null);
  const getSource = (video) => {
    if (!video) return "";
    return URL.createObjectURL(video);
  };
  return (
    <div
      className={[classes.player__wrapper, className && className].join(" ")}
    >
      <label className={classes.label}>{label || "Video"}</label>
      <div className={classes.videoWrapper}
      data-variant={variant}
      >
        {loading && (
          <span className={classes.spinner}>
            <Spinner variant="light" />
          </span>
        )}
        <Button
          onClick={() => {
            if (loading) return;
            inputRef.current.click();
          }}
          className={classes.uploadBtn}
          variant="tertiary"
        >
          <FaUpload color={"var(--main-color)"} />
        </Button>
        {typeof value === "string" && <ReactPlayer url={imageUrl(value)} className={classes.video} controls/>}
        {value && typeof value !== "string" && (
          <video src={getSource(value)} className={classes.video} controls />
        )}
      </div>
      <input
        ref={inputRef}
        type={"file"}
        accept={"video/*"}
        className={classes.input}
        onChange={(e) => setter(e.target.files[0])}
      />
    </div>
  );
}

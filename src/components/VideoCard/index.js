import React, { useEffect, useRef, useState } from "react";
import classes from "./VideoCard.module.css";
import { imageUrl } from "../../config/apiUrl";
import { FaPlay } from "react-icons/fa6";
import ReactPlayer from "react-player";

const VideoCard = ({ item, videoClassname }) => {
  const videoRef = useRef(null);

  const handleThumbnailClick = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      videoRef.current.play(); // Play the video when entering
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        videoRef.current?.pause(); // Pause the video when exiting full screen
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      className={[classes.imgDiv, videoClassname && videoClassname].join(" ")}
      onClick={handleThumbnailClick}
    >
      {/* {thumbnailUrl ? (
        <>
          <img
            src={item?.includes("http") ? thumbnailUrl : logo}
            alt="Video Thumbnail"
          />
          <div className={classes.iconDiv}>
            <img src={resume} alt="Play Icon" />
          </div>
        </>
      ) : (
        <div className={classes.logoImg}>
          <img src={logo} />
          <div className={classes.iconDiv}>
            <img src={resume} alt="Play Icon" />
          </div>
        </div>
      )} */}
      <div className={classes.logoImg}>
        <FaPlay />
      </div>
      <video
        ref={videoRef}
        className={classes.video}
        src={imageUrl(item)}
        playing={false}
        controls={false}
        width={"100%"}
        height={"100%"}
      ></video>
    </div>
  );
};

export default VideoCard;

import ReactPlayer from "react-player";
import classes from "./MediaComponent.module.css";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillEye, AiFillFileWord } from "react-icons/ai";
import { imageUrl, mediaUrl } from "../../../config/apiUrl";
import { BiSolidFilePdf } from "react-icons/bi";
import { pngIcon } from "@/constant/imagePath";
const MediaComponent = ({ media, onShowMore }) => {
  return (
    <div className={classes.media_section}>
      {media?.slice(0, 4)?.map((item, index) => (
        <div
          className={classes.image}
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onShowMore && onShowMore(index);
          }}
        >
          {(
            item?.key
              ? ["jpg", "jpeg", "png"]?.includes(item?.name?.split(".").pop())
              : item?.type?.split("/")[0] === "image"
          ) ? (
            <img
              src={item?.key ? imageUrl(item?.key) : URL.createObjectURL(item)}
              alt=""
            />
          ) : (
              item?.key
                ? ["mp4"]?.includes(item?.name?.split(".").pop())
                : item?.type?.split("/")[0] === "video"
            ) ? (
            <ReactPlayer
              url={
                typeof item?.key
                  ? mediaUrl(item?.key)
                  : URL.createObjectURL(item)
              }
              playing={false}
              controls={true}
              width={"100%"}
              height={"100%"}
              className={classes.videoPlayer}
            />
          ) : (
              item?.type
                ? item?.type == "application/pdf"
                : ["pdf"]?.includes(item?.name?.split(".").pop())
            ) ? (
            <div className={classes.pdfView}>
              <div>
                <img src={pngIcon} alt="" />
                {/* <p>{item?.name}</p> */}
              </div>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window?.open(
                    item?.key ? mediaUrl(item?.key) : URL.createObjectURL(item),
                    "_blank"
                  );
                }}
              >
                <AiFillEye color="var(--white-color)" size={22} />
              </span>
            </div>
          ) : (
            ["document", "docx", "doc"]?.includes(
              item?.name?.split(".").pop()
            ) && (
              <div className={classes.pdfView}>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    window?.open(
                      item?.key
                        ? mediaUrl(item?.key)
                        : URL.createObjectURL(item),
                      "_blank"
                    );
                  }}
                >
                  <AiFillEye color="var(--white-color)" size={22} />
                </span>
                <div>
                  <AiFillFileWord size={40} color={`#004db3`} />
                  <p>{item?.name}</p>
                </div>
              </div>
            )
          )}
          {media?.length > 4 && index == 3 && (
            <div className={classes.show_more}>
              <p>+{media?.length - 4}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default MediaComponent;

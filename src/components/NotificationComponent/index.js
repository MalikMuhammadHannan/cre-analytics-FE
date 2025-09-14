import { Skeleton } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import NoData from "../Core/NoData/NoData";
import classes from "./NotificationComponent.module.css";
import { formatMessageDate } from "../../Helper/HelperFunction";
import { imageUrl } from "@/config/apiUrl";

const NotificationComponent = ({
  data,
  popper = false,
  loading,
  updateSingleNotification,
  handleFlag,
}) => {
  return (
    <>
      {loading == "get-data" ? (
        <>
          {Array(6)
            .fill(0)
            .map((ele, index) => {
              return (
                <div className={classes.notificationSkeleton} key={index}>
                  <Skeleton variant="rounded" height={"100%"} width={"100%"} />
                </div>
              );
            })}
        </>
      ) : (
        <>
          {" "}
          {data?.length > 0 ? (
            <>
              {data?.map((notification, index) => (
                <div
                  onClick={() => {
                    handleFlag(notification);
                    if (notification?.seen || loading == "mark_as_read") {
                      return;
                    }
                    updateSingleNotification(notification?._id);
                  }}
                  className={classes.notification}
                  key={index}
                >
                  <div className={classes.userInfo}>
                    <div className={classes.textInfo}>
                      <div className={classes.textInfoDetails}>
                        <div className={classes.userImgDiv}>
                          <img src={notification?.userImg} alt="user photo" />
                        </div>
                        <div className={classes.details}>
                          <h5>{notification?.title}</h5>
                          <p className={popper ? classes.ellipses : ""}>
                            {notification?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.time}>
                    {/* {!notification?.seen ? ( */}
                    <p> {formatMessageDate(notification?.createdAt)} </p>

                    <div className={classes.icon}>
                      <FaCircle
                        color={notification?.seen ? "green" : "red"}
                        size={10}
                      />
                    </div>
                    {/* ) : null} */}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <NoData
              className={classes.noData}
              text={"No Notifications Found"}
            />
          )}
        </>
      )}
    </>
  );
};

export default NotificationComponent;

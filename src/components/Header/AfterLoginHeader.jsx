import { getUserName } from "@/Helper/HelperFunction";
import { useState } from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Style from "./AfterLoginHeader.module.css";

export const AfterLoginHeader = ({ className, header, drawerBtn, backBtn }) => {
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [profileOverlay, setProfileOverlay] = useState(false);
  const { newNotificationsCount } = useSelector((state) => state.commonReducer);
  const getName = user?.firstName?.slice(0, 1)?.toUpperCase() || "";
  console.log("user", user);
  return (
    <div className={`${[Style.navbarContainer, className].join(" ")}`}>
      {drawerBtn && drawerBtn}
      {backBtn && (
        <div
          className={Style.backBtn}
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoMdArrowDropleft />
        </div>
      )}
      {/* {header && <p className={Style.heading}>{header}</p>} */}
      {/* <div
        className={`${[Style.iconDiv].join(" ")} ${
          Style["notification-header"]
        }`}
      >
        <div
          className={Style.notificationIcon}
          onClick={() => navigate("/notifications")}
        >
          {newNotificationsCount > 0 && (
            <div className={Style.notificationCount}>
              {newNotificationsCount >= 10 ? "9+" : newNotificationsCount}
            </div>
          )}
          <AiFillBell />
        </div>
      </div> */}
      <div className={Style["profile-container"]}>
        <div className={`${[Style.profileImg]} ${Style["profile-wrapper"]}`}>
          <p>{getName}</p>
        </div>
        <p className={Style["profile-name"]}>{getUserName(user)}</p>
      </div>
    </div>
  );
};

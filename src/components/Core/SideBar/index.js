import { ImageIcon, SidebarLogo2 } from "@/constant/imagePath";
import { cloneElement, useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";

import {
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  setSideBarCollapsed,
  signOutRequest,
} from "../../../store/auth/authSlice";
import { Button } from "../Button";
import classes from "./SideBar.module.css";

const SideBar = ({ isCollapsed, isMobile }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [popper, setPopper] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleSubmitSignOut = () => {
    dispatch(signOutRequest());
    navigate("/login");
  };
  return (
    <div className={classes?.mainContainer}>
      <div className={classes?.logoContainer}>
        {isCollapsed ? (
          <div className={classes.logoIcon} onClick={() => navigate("/")}>
            <img src={ImageIcon} height={20} alt="abc" />
          </div>
        ) : (
          <div className={classes.logo} onClick={() => navigate("/")}>
            <img src={SidebarLogo2} height={20} alt="abc" />
          </div>
        )}
      </div>
      <div
        className={classes.toggler}
        onClick={() => {
          dispatch(setSideBarCollapsed(!isCollapsed));
        }}
      >
        <IoChevronForward className={!isCollapsed ? classes.toggleIcon : ""} />
      </div>
      <div
        className={[
          classes.itemsContainer,
          isCollapsed && classes.isCollapsedContainer,
          isMobile && classes.isMobile,
        ].join(" ")}
      >
        {isCollapsed && popper && (
          <span
            className={classes.popper}
            style={{ top: `${popper.pos + 16}px` }}
          >
            {popper.value}
          </span>
        )}
        <div
          className={[
            classes.items,
            isCollapsed && classes.itemsCollapsed,
          ].join(" ")}
        >
          {Links?.map((item, index) => {
            return (
              <RenderItem
                icon={item?.icon}
                title={item?.title}
                path={item?.path}
                subMenu={item?.subMenu}
                isCollapsed={isCollapsed}
                key={index}
                setPopper={setPopper}
              />
            );
          })}
        </div>
        {/* <div className={classes.btn}> */}
        <Button
          className={[
            classes["logout-btn"],
            isCollapsed ? classes["collapsed-btn"] : "",
          ].join(" ")}
          variant="secondary"
          onClick={HandleSubmitSignOut}
        >
          <span>
            <FiLogOut />
          </span>
          {!isCollapsed && "Logout"}
        </Button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default SideBar;

const RenderItem = ({
  icon,
  title,
  subMenu = [],
  path,
  isCollapsed,
  setPopper,
}) => {
  const pathname = useLocation()?.pathname;
  const active = pathname === path ? true : false;
  const [subnav, setSubnav] = useState(false);
  const subActive = subMenu.find((item, index) => item?.path == pathname);
  const showSubnav = () => setSubnav(!subnav);
  useEffect(() => {
    const allPaths = subMenu.map((item) => item?.path);
    if (allPaths.includes(pathname)) {
      setSubnav(true);
    }
  }, []);

  return (
    <>
      <Link
        className={[
          classes?.listItemContainer,
          active && classes?.active,
          subActive && classes?.active,

          isCollapsed ? classes.isCollapsed : "",
        ].join(" ")}
        onMouseEnter={(e) => {
          setPopper({
            pos: e.target.offsetTop - e.target.parentElement.scrollTop,
            value: title,
          });
        }}
        onMouseLeave={(e) => {
          setPopper(null);
        }}
        data-title={title}
        to={subMenu?.length > 0 ? "#" : path}
        onClick={() => {
          if (subMenu?.length > 0) {
            showSubnav(!subnav);
          }
        }}
      >
        {cloneElement(icon, {
          size: 20,
          className: classes.icon,
        })}
        {!isCollapsed && <span>{title}</span>}
        {subMenu?.length > 0 &&
          !isCollapsed &&
          (subnav ? (
            <FiChevronDown size={20} className={classes?.dropDownIcon} />
          ) : (
            <FiChevronUp size={20} className={classes?.dropDownIcon} />
          ))}
      </Link>

      {subnav && (
        <div
          className={[
            classes?.subMenu,
            isCollapsed ? classes.submenuIsCollapsed : "",
          ].join(" ")}
        >
          {subMenu.map((item, index) => {
            return (
              <Link
                className={[
                  classes?.innerItemContainer,
                  isCollapsed
                    ? classes.isCollapsed
                    : classes?.notCollapsedInnercontainer,
                  subActive?.path === item?.path && classes?.innerItemSubActive,
                ].join(" ")}
                onMouseEnter={(e) => {
                  setPopper({
                    pos:
                      e.target.offsetTop +
                      e.target.parentElement.offsetTop -
                      e.target.parentElement.parentElement.scrollTop -
                      10,
                    value: item?.title,
                  });
                }}
                onMouseLeave={(e) => {
                  setPopper(null);
                }}
                data-title={item?.title}
                key={index}
                to={item?.path}
              >
                {item?.icon &&
                  isCollapsed &&
                  cloneElement(item?.icon, {
                    size: 20,
                    color: "var(--white-color)",
                    className: classes.innerIcon,
                  })}

                {!isCollapsed && <span>{item?.title}</span>}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

const Links = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LuLayoutDashboard />,
  },
  {
    title: "Reports",
    path: "/report",
    icon: <TbReportSearch />,
  },
  {
    title: "Settings",
    path: "/profile-settings",
    icon: <FiSettings />,
  },
];

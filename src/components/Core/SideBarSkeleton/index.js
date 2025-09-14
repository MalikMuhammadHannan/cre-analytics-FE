import { AfterLoginHeader } from "@/components/Header/AfterLoginHeader";
import { isMobileViewHook } from "@/CustomHooks/isMobileViewHook";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "react-modern-drawer";
import { useLocation } from "react-router-dom";
import SideBar from "../SideBar";
import classes from "./SideBarSkeleton.module.css";
import { useSelector } from "react-redux";

const SideBarSkeleton = ({
  children,
  footerVisible = false,
  headerHeading,
  showBg = true,
  backBtn,
}) => {
  const { isSidebarCollapsed } = useSelector((state) => state.authReducer);

  const pathname = useLocation().pathname;
  const splitBySlashPathname = pathname.split("/");
  const pathNameLast = splitBySlashPathname[splitBySlashPathname?.length - 1];
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    isMobileViewHook((e) => {
      setIsMobile(e);
    });
  }, []);
  return (
    <>
      <style>{`
        .drawerContainer{
          width:320px !important;
          background-color:transparent !important;
        }
        @media (max-width:768px){
          .drawerContainer{
            width:290px !important;
          }
        }
    `}</style>
      <Container fluid className="g-0" style={{ backgroundColor: "#fafafa" }}>
        <div className={`${classes.wrapper} g-0`}>
          <div
            className={[
              !isMobile ? classes.sidebarDiv : classes.sidebarOnMobileDiv,
              isSidebarCollapsed ? classes.iscollapsed : "",
            ].join(" ")}
          >
            {!isMobile ? (
              <SideBar isCollapsed={isSidebarCollapsed} />
            ) : (
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
                className="drawerContainer"
              >
                <SideBar isCollapsed={false} isMobile={isMobile} />
              </Drawer>
            )}
          </div>
          <div
            className={[
              !isMobile ? classes.contentDiv : classes.contentOnMobileDiv,
              isSidebarCollapsed ? classes.contentIsCollapsed : "",
            ].join(" ")}
          >
            <AfterLoginHeader
              drawerBtn={
                isMobile && (
                  <GiHamburgerMenu
                    className={[classes.GiHamburgerMenuMobile]}
                    onClick={() => {
                      toggleDrawer();
                    }}
                  />
                )
              }
              backBtn={backBtn}
              // header={interpolateString(header[pathNameLast], { slug: slug })}
              header={headerHeading}
            />
            <div
              className={[classes.pageMain, showBg && classes.bgMain].join(" ")}
            >
              {children}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SideBarSkeleton;

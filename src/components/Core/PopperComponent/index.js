"use client";
import { useEffect, useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import classes from "./PopperComponent.module.css";

const PopperComponent = ({
  setOpen,
  open,
  anchorRef,
  data,
  popperInsideElement,
  handleClick,
  isCloseOnClick = true,
  placement = "bottom",
  spaceBetweenRef,
  scrollRef,
}) => {  
  const [refScroll, setRefScroll] = useState(0);
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      setOpen(false);
    });
    if (scrollRef?.current !== null) {
      scrollRef?.current?.addEventListener("scroll", () => {
        setRefScroll(scrollRef?.current?.scrollTop);
        if (scrollRef?.current?.scrollTop !== refScroll) {
          setOpen(false);
        }
        if (scrollRef?.current?.scrollBottom !== refScroll) {
          setOpen(false);
        }
      });
    }
    return () => {
      scrollRef?.current?.removeEventListener("scroll", () => {});
      window?.removeEventListener("resize", () => {});
    };
  }, [scrollRef?.current]);

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <style>{`
.MuiPopper-root[data-popper-placement*=top] .${classes.popperDiv}{
    --top: 100%;
    ${spaceBetweenRef ? `--margin-bottom:${spaceBetweenRef};` : ""}
    --rotate: 45deg;
    --transform: -8px;
    --shadow-y: 5px;
    z-index:22;
}
.MuiPopper-root[data-popper-placement*=bottom] .${classes.popperDiv}{
    --bottom: 100%;
    ${spaceBetweenRef ? `--margin-top:${spaceBetweenRef};` : ""}
    --rotate: -135deg;
    --transform: 9px;
    --shadow-y: -8px;
    z-index:22;

}
.MuiPopper-root{
 z-index:22 !important;
}
.Mui-focusVisible{
background-color:transparent !important;
z-index:22;

}
.base-Popper-root{
  z-index:22;
}
`}</style>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={placement}
        transition
        disablePortal
        style={{
          "--top": "100%",
          "--margin": `${spaceBetweenRef}`,
          "--rotate": "45deg",
          "--transform": "-8px",
          "--shadow-y": "5px",
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <Paper className={[classes.popperDiv]}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {data?.length > 0 &&
                      data?.map((item, i) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              isCloseOnClick && setOpen(false);
                              handleClick(item);
                            }}
                            className={classes.menuItem}
                            key={i}
                          >
                            {item?.icon} {item?.label}
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                  {popperInsideElement}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default PopperComponent;

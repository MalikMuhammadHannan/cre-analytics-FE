"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import styles from "./tooltip.module.css";
function Tooltip({ icon, value, className, position = "bottom", parentClass }) {
  const randomId = `tooltip-${Math.ceil(Math.random() * 1000)}`;
  return (
    <>
      <style>
        {`
        .react-tooltip{
          background-color: light-dark(#222,silver);
          color:light-dark(#fff,#000);
          opacity:1
        }
      `}
      </style>
      <div className={[styles.tooltip, parentClass].join(" ")}>
        <a
          id={randomId} // Unique ID for each anchor
          data-tip
          data-for={randomId} // Matches the tooltip ID
          className={[styles["link"]].join(" ")}
        >
          {icon}
        </a>
        <ReactTooltip
          anchorSelect={`#${randomId}`} // Use the dynamically generated ID
          id={randomId}
          type="dark"
          effect="solid"
          className={[className, styles["tooltip_bg"]].join(" ")}
          place={position}
        >
          <span className={styles["value"]}>{value}</span>
        </ReactTooltip>
      </div>
    </>
  );
}
export default Tooltip;

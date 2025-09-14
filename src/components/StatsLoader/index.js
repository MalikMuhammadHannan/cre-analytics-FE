import { Skeleton } from "@mui/material";
import React from "react";
import classes from "./StatsLoader.module.css";
const StatsLoader = ({ loaderCount = 6 }) => {
  return (
    <>
      <div className={classes.loaderContainer}>
        {Array(loaderCount)
          .fill(0)
          ?.map((_, index) => (
            <div className={classes.loader} key={index}>
              <Skeleton variant="rounded" width={"100%"} height={100} />
            </div>
          ))}
      </div>
    </>
  );
};

export default StatsLoader;

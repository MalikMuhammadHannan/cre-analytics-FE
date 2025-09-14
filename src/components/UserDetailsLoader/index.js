import React from "react";
import classes from "./UserDetailsLoader.module.css";
import { Skeleton } from "@mui/material";
const UserDetailsLoader = ({ handlers, labelFields }) => {
  return (
    <>
      <div className={classes.customerDetails}>
        <div className={classes.header}>
          <Skeleton variant={"text"} width={200} height={30} />
          <div className={classes.buttonsDiv}>
            {Array(handlers?.length || 0)
              .fill()
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant={"rounded"}
                  width={120}
                  height={41}
                />
              ))}
          </div>
        </div>
        <div className={classes.customerContent}>
          <div className={[classes.agent_profile, classes.fullWidth].join(" ")}>
            <div className={classes.image_profile}>
              <Skeleton variant="circle" height={"100%"} width={"100%"} />
            </div>
            <div className={classes.agent_content}>
              <Skeleton variant="text" width={250} height={30} />
              <Skeleton variant="text" width={150} height={30} />
            </div>
          </div>

          {Array(labelFields?.length)
            .fill()
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={"100%"}
                height={45}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default UserDetailsLoader;

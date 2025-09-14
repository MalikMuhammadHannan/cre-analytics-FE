import React from "react";
import classes from "./EditDetailsLoader.module.css";
import { Spinner } from "react-bootstrap";
import { Skeleton } from "@mui/material";
const EditDetailsLoader = ({ isW9 = true, haslicense = true }) => {
  return (
    <div className={classes.loaderForm}>
      <div className={classes.fullWidth}>
        <Skeleton height={136} width={136} variant="circular" />
      </div>
      <Skeleton height={48} width={"100%"} variant="rounded" />
      <Skeleton height={48} width={"100%"} variant="rounded" />
      <Skeleton height={48} width={"100%"} variant="rounded" />
      <Skeleton height={48} width={"100%"} variant="rounded" />
      <Skeleton height={48} width={"100%"} variant="rounded" />
      <Skeleton height={48} width={"100%"} variant="rounded" />
      {isW9 && (
        <div className={classes.fullWidth}>
          <Skeleton height={200} width={"100%"} variant="rounded" />
        </div>
      )}
      {haslicense && (
        <div className={[classes.license, classes.fullWidth].join(" ")}>
          <Skeleton height={200} width={"100%"} variant="rounded" />
          <Skeleton height={200} width={"100%"} variant="rounded" />
        </div>
      )}
      <div className={[classes.btnsLoader, classes.fullWidth].join(" ")}>
        <Skeleton height={41} width={100} variant="rounded" />
        <Skeleton height={41} width={100} variant="rounded" />
      </div>
    </div>
  );
};

export default EditDetailsLoader;

import React from "react";
import classes from "./UserComponent.module.css";
import moment from "moment";

export default function UserComponent({ data }) {
  return (
    <div className={classes.userWrapper}>
      <img src={data?.image} alt="user" />
      <div className={classes.__wrapper}>
        <div className={classes.name}>{data?.name}</div>
        <div className={classes.createdAt}>
          Since: {moment(data?.createdAt).format("DD MMMM YYYY")}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import classes from "./RenderField.module.css";
const RenderField = ({ label, value }) => {
  return (
    <>
      <div className={classes.field}>
        <h6>{label}</h6>
        <div className={classes.field_content}>
          <p>{value}</p>
        </div>
      </div>
    </>
  );
};

export default RenderField;

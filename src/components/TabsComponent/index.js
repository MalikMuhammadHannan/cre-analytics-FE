import React from "react";
import classes from "./TabsComponent.module.css";
const TabsComponent = ({ tabOptions, value, setter }) => {
  return (
    <>
      <div className={classes.tabs_container}>
        {tabOptions?.map((tab) => (
          <div
            className={[
              classes.tab,
              value?.value === tab?.value && classes.active,
            ].join(" ")}
            onClick={() => setter(tab)}
          >
            <p>{tab?.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TabsComponent;

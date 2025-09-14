import React, { useState } from "react";
import classes from "./MultiInput.module.css";
import Tooltip from "../Tooltip";
import { MdOutlineInfo } from "react-icons/md";
const MultiInput = ({
  value,
  setter,
  label,
  placeholder = "Enter Text",
  info,
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={classes.multiInput}>
      <p className={classes.label}>
        {label}
        {info && (
          <Tooltip icon={<MdOutlineInfo size={16} />} value={info} />
        )}
      </p>
      <div className={classes.input_container}>
        {value.map((ele, index) => (
          <div key={index} className={classes.input}>
            <p>{ele}</p>
            <span onClick={() => setter(value.filter((_, i) => i !== index))}>
              x
            </span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            const input = inputValue?.trim()?.toLowerCase();
            if (!input || value?.includes(input)) return;
            if (e.key === "Enter") {
              setter([...value, input]);
              setInputValue("");
            }
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default MultiInput;

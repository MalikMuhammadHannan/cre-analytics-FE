import { BiSearch } from "react-icons/bi";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import { isMobileViewHook } from "@/CustomHooks/isMobileViewHook";
import classes from "./SearchInput.module.css";
function SearchInput({
  value,
  setter,
  placeholder = "Search",
  customStyle,
  inputStyle,
  backgroundColor,
  iconColor = "var(--main-color)",
  inputWidth = "400px",
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    isMobileViewHook(setIsMobile, 480);
  }, [window.innerWidth]);
  return (
    <Input
      setter={setter}
      value={value}
      customStyle={{
        heigth: "100%",
        width: isMobile ? "100%" : inputWidth,
        padding: "5px",
        backgroundColor: backgroundColor
          ? backgroundColor
          : "var(--field-background-light)",
        paddingRight: "40px",
        border: "1px solid var(--main-color)",
        borderRadius: "4px",
        ...customStyle,
      }}
      inputStyle={{
        padding: "5px 14px 5px 35px",
        fontSize: "var(--fs-100)",
        border: "none",
        backgroundColor: "transparent",
        borderRadius: "0",
        border:'none',
        ...inputStyle,
      }}
      parentClass={classes.saerchInput}
      placeholder={placeholder}
      leftIcon={
        <span
          style={{
            padding: "4px",
            borderRadius: "50%",
            marginTop: "-4px",
          }}
        >
          <BiSearch
            size={22}
            color={iconColor}
            style={{
              marginBottom: "-2px",
            }}
          />
        </span>
      }
    />
  );
}

export default SearchInput;

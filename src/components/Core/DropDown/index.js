"use client";
import ReactSelect, { components } from "react-select";
import classes from "./DropDown.module.css";
import PropTypes from "prop-types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
export const DropDown = ({
  options,
  label,
  labelTwo,
  customStyle,
  disabled,
  value,
  setter,
  noBorder,
  placeholder,
  placeholderColor = "var(--placeholder-color)",
  isMulti,
  style,
  leftIcon,
  Components,
  labelClassName,
  indicatorColor = "var(--text-color)",
  optionLabel,
  optionValue,
  singleValueColor = "var(--text-color)",
  customeClassName = "DropdownOptionContainer",
  className,
  isSearchable,
  CustomOption,
  error,
  errorText,
  menuPlacement = "auto",
  ...props
}) => {
  const DropdownIndicator = (props) => {
    return (
      <>
        <style>
          {`
            .DropdownOptionContainer__indicator{
            padding: 2px;
            border-radius: 8px;
            height:30px;
            width:30px;

            display:flex;
            align-items:center;
            justify-content:center;
            }
          `}
        </style>
        <components.DropdownIndicator {...props}>
          {props?.selectProps?.menuIsOpen ? (
            <IoIosArrowUp size={18} color={indicatorColor} />
          ) : (
            <IoIosArrowDown size={18} color={indicatorColor} />
          )}
        </components.DropdownIndicator>
      </>
    );
  };

  const dropDownStyle = {
    control: (styles, { isFocused, isDisabled, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled ? "var(--disabled-input-color)" : "#fff",
      padding: "7px 13px 7px 8px",
      color: "var(--main-color)",
      boxShadow: "none",
      fontFamily: "var(--ff-primary-reg)",
      fontSize: "var(--fs-base)",
      letterSpacing: "1.4",
      cursor: "pointer",
      border: "none",
      borderRadius: "4px",
      textTransform: "capitialize",
      border: error ? "1px solid red" : "1px solid #C7C7C7",
      // border: "1px solid var(--border-color)",
      ...customStyle,

      ":hover": {
        ...styles[":hover"],
        borderColor: "var(--border-color)",
      },
      ":placeholder": {
        ...styles[":placeholder"],
        color: "var(--placeholder-color)",
        fontWeight: "700",
        fontFamily: "var(--ff-primary-bold)",
        opacity: 0.8,
      },
      ":active": {
        ...styles[":active"],
        borderColor: "var(--primary-color)",
      },
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        fontFamily: "var(--ff-primary-med)",
        color: placeholderColor,
        opacity: 0.8,
      };
    },

    singleValue: (provided) => ({
      ...provided,
      color: singleValueColor,
    }),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected && "var(--primary-color)",
        color: isSelected && "var(--white-color)",
        padding: "8px 12px",
        fontFamily: "var(--ff-primary-reg)",
        textTransform: "capitialize",

        ":active": {
          ...styles[":active"],
          color: "#fff",
          backgroundColor:
            "color-mix(in srgb, var(--primary-color) 25%, white)",
        },
        ":hover": {
          ...styles[":hover"],
          color: "#fff",
          backgroundColor:
            "color-mix(in srgb, var(--primary-color) 25%, white)",
          cursor: "pointer",
        },
      };
    },

    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "color-mix(in srgb, var(--primary-color) 25%, white)",
        borderRadius: "4px",
        padding: "2px",
        fontFamily: "var(--ff-primary-reg)",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return { ...styles, color: "#fff" };
    },
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      fontSize: "var(--fs-base)",
      color: "#000",
      ":hover": {
        color: "#000",
      },
    }),
  };

  return (
    <div
      className={`${[classes.Container, className ? className : ""].join(" ")}`}
    >
      <style>{`
        .DropdownOptionContainer__menu {
          margin: 0px;
          border: 0px;
          z-index: 1100 !important;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
        }
        // .DropdownOptionContainer__single-value {
        //   color: ${singleValueColor} !important;
        // }
      `}</style>
      {label && (
        <label
          htmlFor={`dropdown${label}`}
          className={`${[
            classes.label,
            labelClassName && labelClassName,
            disabled && classes.disabled,
          ].join(" ")}`}
        >
          {label}
          {/* {labelTwo && (
            <span style={{ color: Colors.neutralShadesOfDimGray }}>
              {" " + labelTwo}
            </span>
          )} */}
        </label>
      )}

      <div className={`${[classes.dropdownContainer].join(" ")}`}>
        <ReactSelect
          inputId={`dropdown${label}`}
          value={value}
          onChange={(e) => {
            setter(e);
          }}
          className={`${[classes.reactSelect].join(" ")}`}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isDisabled={disabled}
          placeholder={placeholder}
          options={options}
          styles={{ ...dropDownStyle, ...style }}
          isClearable={false}
          classNamePrefix={customeClassName}
          menuPlacement={menuPlacement}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: (e) => DropdownIndicator(e),
            ...(CustomOption && { Option: CustomOption }),
            ...Components,
          }}
          getOptionLabel={(option) => {
            return optionLabel ? option[optionLabel] : option.label;
          }}
          getOptionValue={(option) =>
            optionValue ? option[optionValue] : option.value
          }
          {...props}
        />
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
        {error && <p className={classes.errorText}>{errorText}</p>}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  labelTwo: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.object.isRequired,
  setter: PropTypes.object,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  customStyle: PropTypes.object,
  style: PropTypes.object,
  Components: PropTypes.object,
  labelClassName: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};

DropDown.defaultProps = {
  placeholder: "sdsad",
  value: "aaaa",
  disabled: false,
  isMulti: false,
  options: [],
  Components: {},
};

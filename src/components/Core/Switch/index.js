import classes from "./Switch.module.css";
import PropTypes from "prop-types";

export const Switch = ({ value, setter, disabled = false, checkedBg }) => {
  return (
    <>
      <style>
        {`
          input:checked + .${classes.slider} {
            background: ${checkedBg || "#7CBF6F"} !important;
            color: var(--white-color) !important;
          }
            input:not(:checked) + .${classes.slider}{
              padding-left: 34px !important;
          }
          .${classes.slider} {
            // background-color: var(--input-background-color);
          }
        `}
      </style>
      <label className={classes.switch}>
        <input type="checkbox" checked={value} disabled={disabled} />
        <span
          className={`${[classes.slider, classes.round].join(" ")}`}
          onClick={() => {
            !disabled && setter(!value);
          }}
        >
          {value ? "Active" : "Inactive"}
        </span>
      </label>
    </>
  );
};

Switch.propTypes = {
  value: PropTypes.bool,
  setter: PropTypes.func,
  disabled: PropTypes.bool,
};
Switch.defaultProps = {
  value: false,
};

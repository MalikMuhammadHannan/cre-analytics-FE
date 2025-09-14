import classes from "./Radio.module.css";
import PropTypes from "prop-types";

export const Radio = ({ value, setValue, label, labelStyles, disabled }) => {
  return (
    <div className={`${classes.radioWithLabel}`}>
      <input
        type="radio"
        id={`radio${label}`}
        checked={value === label && "checked"}
        disabled={disabled}
        onChange={(e) => {
          setValue(label);
        }}
        className={`${[classes.radioInput].join(" ")}`}
      />
      {label && (
        <label
          htmlFor={`radio${label}`}
          className={` ${classes.label}`}
          style={labelStyles}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Radio.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
Radio.defaultProps = {
  value: false,
  disabled: false,
  label: null,
};

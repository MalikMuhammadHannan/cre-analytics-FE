import classes from "./TextArea.module.css";
import PropTypes from "prop-types";

export function TextArea({
  value,
  setter,
  label,
  placeholder,
  customStyle,
  labelStyle,
  rows = 5,
  className,
  disabled,
  error,
  errorText,
}) {
  return (
    <div className={classes.textAreaBox}>
      {label && (
        <label
          style={{ ...labelStyle }}
          className={`${[disabled && classes.labelDisabled, classes.label].join(
            " "
          )}`}
        >
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        style={{
          ...customStyle,
          border: error ? "1px solid red" : "1px solid var(--border-color);",
        }}
        onChange={(e) => {
          setter(e.target.value);
        }}
        onBlur={() => {
          setter(value?.trim());
        }}
        className={className}
        rows={rows}
        disabled={disabled}
      />
      {error && <p className={classes.errorText}>{errorText}</p>}
    </div>
  );
}
TextArea.propTypes = {
  value: PropTypes.string,
  setter: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};

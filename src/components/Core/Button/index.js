import PropTypes from "prop-types";
import classes from "./button.module.css";

export const Button = ({
  parent,
  label,
  customStyle,
  secondaryButton,
  onClick,
  disabled,
  children,
  className,
  leftIcon,
  rightIcon,
  width,
  background,
  color,
  variant = "primary",
  isHover,
  isSimpleHover,
  ...props
}) => {
  return (
    <>
      <button
        className={`${[
          classes.btn,
          secondaryButton && classes.secondaryBtn,
          isHover && classes.hover,
          isSimpleHover && classes.isSimpleHover,
          className && className,
          disabled && classes.disabled,
        ].join(" ")}`}
        style={customStyle && customStyle}
        onClick={onClick}
        disabled={disabled ? disabled : false}
        data-variant={variant}
        {...props}
      >
        {/* {parent} */}
        {/* {props} */}
        {leftIcon && leftIcon}
        {label && label}
        {children && children}
        {rightIcon && rightIcon}
      </button>
    </>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
  customStyle: {},
};

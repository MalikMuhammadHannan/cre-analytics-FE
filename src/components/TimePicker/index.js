import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { TbExclamationCircle } from "react-icons/tb";
// import Tooltip from "../Tooltip";
import classes from "./TimePicker.module.css";
import { formatDate } from "@/Helper/HelperFunction";

const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const todayEndOfTheDay = today.endOf("day");

export default function TimePickerComponent({
  setter,
  value,
  label,
  placeholder,
  disabled = false,
}) {
  return (
    <>
      <style jsx>{`
        .css-kjd0cg-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton {
          background-color: var(--main-color) !important;
        }
        .css-5hk6ak-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton {
          background-color: var(--main-color) !important;
        }
        .css-1eam32d-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton {
          background-color: var(--main-color) !important;
        }
        .css-5hk6ak-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton {
          background-color: var(--main-color) !important;
        }
        .css-1wahiw3-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton:hover {
          background-color: var(--main-color) !important;
        }
        .css-1wahiw3-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton {
          background-color: var(--main-color) !important;
        }
        .MuiButtonBase-root MuiIconButton-root {
          background-color: var(--main-color) !important;
        }
        .css-d0vs79-MuiClockPointer-root {
          background-color: var(--main-color) !important;
        }
        .css-umzx0k-MuiClock-pin {
          background-color: var(--main-color) !important;
        }
        .css-eg3pzz-MuiClockPointer-thumb {
          background-color: var(--main-color) !important;
          border: 16px solid var(--main-color) !important;
        }
        .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
          background-color: var(--input-background-color) !important;
        }
        .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-error
          .MuiOutlinedInput-notchedOutline {
          border-color: var(--border-color) !important;
        }
        .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
          border-color: var(--border-color) !important;
        }
        .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
          color: var(--primary-text-color) !important;
          background: var(--input-background-color) !important;
          font-family: var(--ff-primary-reg) !important;
        }
        .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input::placeholder {
          color: var(--primary-text-color) !important;
        }
        .css-i4bv87-MuiSvgIcon-root {
          fill: var(--primary-text-color) !important;
        }
        .css-xb7uwb-MuiPickersArrowSwitcher-spacer {
          width: 0px !important;
        }
        .css-zddqwy-MuiClockNumber-root {
          color: var(--primary-text-color) !important;
        }
        .css-1yllih9-MuiPaper-root-MuiPickersPopper-paper {
          background-color: var(--section-background) !important;
        }
        .css-4f0ona-MuiClock-clock {
          background-color: var(--section-background-light);
        }
        .css-rdq5h4-MuiClockPointer-root {
          background-color: var(--main-color) !important;
        }
        .css-zddqwy-MuiClockNumber-root.Mui-selected {
          background-color: var(--main-color) !important;
        }
        .css-12t0dn4-MuiClockPointer-thumb {
          border: 16px solid var(--main-color) !important;
        }
        .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
          min-width: 100% !important;
        }
        .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
          background-color: var(--section-background) !important;
          color: var(--primary-text-color) !important;
        }
        .css-1hbyad5-MuiTypography-root {
          color: var(--primary-text-color) !important;
        }
        .css-13u1oz-MuiButtonBase-root-MuiButton-root-MuiPickersToolbarButton-root {
          color: var(--primary-text-color) !important;
        }
        .css-1mgnakj-MuiTypography-root-PrivatePickersToolbarText-root {
          color: var(--primary-text-color) !important;
        }
        .css-iyrw7v-MuiTypography-root-PrivatePickersToolbarText-root {
          color: var(--primary-text-color) !important;
        }
        .css-1lfjyjz-MuiTypography-root-PrivatePickersToolbarText-root-MuiTimePickerToolbar-separator {
          color: var(--primary-text-color) !important;
        }
        .css-1e6y48t-MuiButtonBase-root-MuiButton-root {
          color: var(--main-color) !important;
        }
        .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
          color: var(--primary-text-color) !important;
        }
        .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input::placeholder {
          color: var(--primary-text-color) !important;
        }
      `}</style>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <label className={classes.labelText}>{label}</label>
        <TimePicker
          // open={true} // Keeps the picker open
          // onClose={(e) => e.preventDefault()} // Prevents closing
          disableFuture
          value={value}
          onChange={(newValue) => {
            setter(newValue.$d);
          }}
          renderInput={(params) => (
            <TextField
              InputLabelProps={{ shrink: false }}
              onKeyDown={(e) => e.preventDefault()}
              {...params}
              placeholder={"Select Time"}
              InputProps={{
                ...params.InputProps,
                readOnly: true,
              }}
              inputProps={{
                ...params.inputProps,
                placeholder: "Select Time",

                className: classes.input,
              }}
            />
          )}
          disabled={disabled}
        />
      </LocalizationProvider>
    </>
  );
}

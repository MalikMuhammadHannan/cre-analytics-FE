"use client";
import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import classes from "./DateInput.module.css";

export default function DateInput({
  value,
  setValue,
  label,
  placeholder,
  minDate = false,
  maxDate = false,
  error,
  errorText,
  ...props
}) {
  return (
    <>
      <style>{`
         .${classes.input} input:placeholder {
                 opacity: 1 !important;
                 color: var(--placeholder-color)
                  }
                  .MuiButtonBase-root-MuiPickersDay-root.Mui-selected{
                  color: var(--secondary-color)
                  }
          .MuiOutlinedInput-notchedOutline {
            border: none;
          }
          .MuiSvgIcon-root {
            color: var(--label-color) !important;
          }
          .base-Popper-root{
            z-index: 1100 !important;
          }
            .MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button  svg{
              color: var(--label-color) !important;
            }
          `}</style>
      {label && <label className={classes?.label}>{label}</label>}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          value={value ? dayjs(value) : null}
          className={[classes.input, error && classes.error].join(" ")}
          onChange={(newValue) => {
            setValue(newValue ? dayjs(newValue).format("MM/DD/YYYY") : "");
          }}
          renderInput={(params) => (
            <TextField
              InputLabelProps={{ shrink: false, placeholder: placeholder }}
              onKeyDown={(e) => e.preventDefault()}
              {...params}
              sx={{
                svg: {
                  color: "var(--secondary-color)",
                  fontSize: "20px",
                  marginRight: "5px",
                },
                input: { color: "var(--secondary-color)  ", fontSize: "20px" },
              }}
            />
          )}
          {...props}
        />
      </LocalizationProvider>
      {error && (
        <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
      )}
    </>
  );
}

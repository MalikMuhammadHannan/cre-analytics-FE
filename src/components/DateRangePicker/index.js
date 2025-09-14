import React from "react";
import classes from "./RangePicker.module.css";
import moment from "moment";
import { Input } from "@/components/Core/Input";
import { Button } from "../Core/Button";
import { FaCalendar } from "react-icons/fa6";
import { ClickAwayListener } from "@mui/material";

export default function CustomDateRangePicker({ value, setValue }) {
  const [state, setState] = React.useState([
    value ? moment(value[0]) : moment().subtract(1, "month"),
    value ? moment(value[1]) : moment(),
  ]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    if (setValue) {
      setValue(e);
    }
  };

  return (
    <div className={classes.datePicker__wrapper}>
      <Button
        className={classes.btn}
        variant="none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaCalendar />
        <span>{state[0].format("MMM, Do YYYY")}</span> -{" "}
        <span>{state[1].format("MMM, Do YYYY")}</span>
      </Button>

      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className={classes.datePicker}>
            <Input
              type="date"
              value={state[0].format("YYYY-MM-DD")}
              setter={(e) => {
                const [start, end] = state;
                setState([moment(e), end]);
                handleChange([moment(e), end]);
              }}
              max={moment(state[1]).format("YYYY-MM-DD")}
              blur={handleChange}
            />
            <span>-</span>
            <Input
              type="date"
              value={state[1].format("YYYY-MM-DD")}
              setter={(e) => {
                const [start, end] = state;
                setState([start, moment(e)]);
                handleChange([start, moment(e)]);
              }}
              min={moment(state[0]).format("YYYY-MM-DD")}
              max={moment().format("YYYY-MM-DD")}
              blur={handleChange}
            />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

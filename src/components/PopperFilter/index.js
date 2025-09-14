import { useState } from "react";
import classes from "./PopperFilter.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import DateInput from "../DateInput";
import { DropDown } from "../Core/DropDown";
import RangeSlider from "@/components/RangeSlider";
import { Button } from "../Core/Button";

export default function PopperFilter({ setPopper, onclick }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [range, setRange] = useState([0, 100000]);
  const [flagReason, setFlagReason] = useState("all");

  const handleFilter = () => {
    let params = {
      startDate,
      endDate,
      range,
      flagReason,
    };
    onclick(params);
  };

  return (
    <div className={classes.filter__wrapper}>
      <div className={classes.filter__header}>
        <p className={classes.filter__heading}>Sort</p>
        <div className={classes.closeBtn} onClick={() => setPopper(false)}>
          <IoMdCloseCircle size={22} color={"var(--white-color)"} />
        </div>
      </div>
      <div className={classes.filter__body}>
        <div className={classes.filter__inputs}>
          <p className={classes.__heading}>Date Range</p>
          <div className={classes.dateInput}>
            <DateInput
              value={startDate}
              setValue={setStartDate}
              label="Start Date"
            />
          </div>
          <div className={classes.dateInput}>
            <DateInput value={endDate} setValue={setEndDate} label="End Date" />
          </div>
        </div>
        <div className={classes.filter__inputs}>
          <p className={classes.__heading}>Amount Range</p>
          <div className={classes.filter__range}>
            <div>
              <label className={classes.label}>Set Range</label>
              <RangeSlider value={range} setValue={setRange} />
            </div>
          </div>
        </div>
        <div className={classes.filter__inputs}>
          <p className={classes.__heading}>Flag Reason</p>
          <div className={classes.filter__dropdown}>
            <DropDown
              placeholder={"Flag Reason"}
              isSearchable={false}
              value={flagReason}
              setter={setFlagReason}
              options={[
                { label: "All", value: "all" },
                { label: "Fraud", value: "fraud" },
                { label: "Other", value: "other" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className={classes.btn__wrapper}>
        <Button className={classes.btn} onClick={handleFilter}>
          Apply Filter
        </Button>
        <Button
          className={classes.btn}
          variant="bordered-white"
          onClick={() => setPopper(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

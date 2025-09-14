"use client";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { FaMinus, FaPlus } from "react-icons/fa";
import classes from "./RangeSlider.module.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const CustomStyledSlider = styled(Slider)({
  color: "var(--main-color)",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "var(--main-color)",
    border: "2px solid var(--main-color)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: "0px 4px",
    width: "auto",
    height: 22,
    minWidth: 22,
    borderRadius: "2px",
    backgroundColor: "var(--main-color)",
    transformOrigin: "bottom center",
    transform: "translate(0%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(0%, -100%) rotate(0) scale(1)",
    },
    "& > *": {
      transform: "rotate(0)",
    },
  },
});

const LabelWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "-8px",
});

export default function MinimumDistanceSlider({
  value,
  setValue,
  unit,
  unitBefore,
  max = 1000,
  min = 0,
}) {
  const minDistance = 1; // Ensure minimum distance of 1 step

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[0] < 0 || newValue[1] > max) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <>
      <style>
        {`
        .actions_left{
          // transform: translateX(-50%);
        }
        .slider_arrows span{
          display: flex;
          align-items: center;
        }
        .slider_arrows span svg{
          cursor: pointer;
          font-size: 17px;
        }
      `}
      </style>
      <Box sx={{ width: "100%", paddingInline: "0.5rem" }}>
        <CustomStyledSlider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
          min={min}
          max={max}
          step={1}
        />
      </Box>
    </>
  );
}

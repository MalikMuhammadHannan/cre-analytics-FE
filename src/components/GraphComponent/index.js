import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import classes from "./GraphComponent.module.css";

const data = [
  {
    name: "Jan",
    new: 4000,
    resub: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    new: 3000,
    resub: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    new: 2000,
    resub: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    new: 2780,
    resub: 3908,
    amt: 2000,
  },
  {
    name: "May",
    new: 1890,
    resub: 4800,
    amt: 2181,
  },
  {
    name: "June",
    new: 2390,
    resub: 3800,
    amt: 2500,
  },
  {
    name: "July",
    new: 3490,
    resub: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    new: 3490,
    resub: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    new: 3490,
    resub: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    new: 3490,
    resub: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    new: 3490,
    resub: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    new: 3490,
    resub: 4300,
    amt: 2100,
  },
];

export default function GraphComponent({ graphData, label1, label2 }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={graphData || data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--secondary-color)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--secondary-color)"
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--secondary-text-color)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--secondary-text-color)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          wrapperClassName={classes.tooltipWrapper}
          contentStyle={{
            backgroundColor: "#18191b !important",
            border: "none !important",
          }}
        />
        <Area
          type="monotone"
          dataKey={label1}
          stroke="var(--secondary-color)"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey={label2}
          stroke="var(--secondary-text-color)"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

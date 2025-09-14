import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import classes from "./ReChart.module.css";

export default function ReChart({ data, yAxisLabel = "", height = 400 }) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return data[0].fail ? (
        <div className={classes.customTooltip}>
          <div className={classes.transactionMainDiv}>
            <div className={classes.transactionHeading}>
              <p className={classes.transactionTitle}>Failed Transactions: </p>
              <p
                className={classes.transactionValue}
              >{`${payload[1]?.value} `}</p>
            </div>
            <div className={classes.transactionHeading}>
              <p className={classes.SuccessfulTitle}>
                Successful Transactions{" "}
              </p>
              <p
                className={classes.transactionValue}
              >{`${payload[0]?.value} `}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.customTooltip}>
          <div className={classes.heading}>
            <p className={classes.title}>Users: </p>
            <p className={classes.value}>{`${payload[0]?.value} `}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const ActiveDot = (props) => {
    const { cx, cy, setTop, setLeft } = props;
    setTop(cy);
    setLeft(cx);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={8} // Radius
        fill="#30bcdd" // Fill color
        // fillOpacity={0.3} // Fill transparency
        // stroke="var(--primary-text-color)" // Border color" // Border color
        // strokeWidth={2} // Border width
      />
    );
  };
  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} dy={20} textAnchor="middle" style={{ fill: "#4A4A4A" }}>
        {payload.value}
      </text>
    );
  };

  const CustomCursor = (props) => {
    const { customTop, customLeft, height } = props;
    return (
      <line
        x1={customLeft}
        y1={customTop}
        x2={customLeft}
        y2={height}
        stroke="#30bcdd"
        strokeWidth={2}
        strokeDasharray={"8 8"}
      />
    );
  };

  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} textAnchor="end" style={{ fill: "#4A4A4A" }}>
        {`${yAxisLabel}${payload.value}`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} height={height}>
      <AreaChart
        width={500}
        height={0}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: -5,
          bottom: 0,
        }}
        padding={{
          top: 0,
          right: 0,
          left: 10,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF7F50" />
            <stop offset="100%" stopColor="#FFDB58" />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          horizontal={true}
          strokeDasharray="6 6"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />

        <Tooltip
          cursor={<CustomCursor customTop={top} customLeft={left} />}
          // cursor={{ strokeDasharray: "3 3", stroke: "#FFB300" }}
          content={<CustomTooltip />}
        />

        <Area
          type="monotone"
          dataKey="value"
          // stroke="url(#strokeGradient)"
          strokeWidth={6}
          stroke="#0f6ecd"
          // fillOpacity={1}
          // fill="url(#colorUser)"
          fill="transparent"
          activeDot={<ActiveDot setTop={setTop} setLeft={setLeft} />} // Use the ActiveDot component here
        />

        {data[0].fail ? (
          <Area
            type="monotone"
            dataKey="fail"
            stroke="#FFDB58"
            strokeWidth={6}
            // fillOpacity={1}
            // fill="url(#colorUser)"
            fill="transparent"
            activeDot={<ActiveDot setTop={setTop} setLeft={setLeft} />} // Use the ActiveDot component here
          />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );
}

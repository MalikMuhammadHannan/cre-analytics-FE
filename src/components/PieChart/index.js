import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import  {pieChartData}  from "@/config/DummyData";
import classes from './PieChart.module.css'

export default function PieChartComponent(  ) {
  const COLORS = [
    "#FFAD54",
    "var(--secondary-color)",
    "var(--main-color)",
    "#FFD9D9",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentageCalc = (percent * 100).toFixed(0);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {/* Show Win Loss */}
        {percentageCalc > 0 && `${percentageCalc}%`}
      </text>
    );
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={355}>
        <PieChart width={"100%"} height={400} className={classes.pieChartMain}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={"100%"}
            stroke={false}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

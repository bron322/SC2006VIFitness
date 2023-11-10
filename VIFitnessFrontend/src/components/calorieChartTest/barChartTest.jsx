import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useAuth } from "@/hooks/AuthProvider";
import { format } from 'date-fns';
import { useEffect, useState } from "react";

function BarChartTest(props) {
  const [barChartData, setBarChartData] = useState([]);
  const { user } = useAuth();
  // const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const now = format(new Date(), "PPP");
  const chartSetting = {
    yAxis: [
      {
        label: 'Total Calories',
      },
    ],
    width: 600,
    height: 500,
    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: 'translate(-20px, 0)',
    //   },
    // },
  };
  const data = [
    {
      dayOfWeek: now,
      "Calories Taken": props.meals.reduce((acc, cur) => acc + (parseFloat(cur.calorie) || 0), 0),
      "Calories Burnt": props.workouts.reduce((acc, cur) => acc + (parseFloat(cur.calories) || 0), 0),
    },
  ];

  // const xLabel = [now]

  const valueFormatter = (value) => `${value}cal`;


  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'dayOfWeek', tickValues: props.xLabel}]}
      series={[
        { dataKey: 'Calories Taken', label: 'Calories Taken', valueFormatter },
        { dataKey: 'Calories Burnt', label: 'Calories Burnt', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
export default BarChartTest;

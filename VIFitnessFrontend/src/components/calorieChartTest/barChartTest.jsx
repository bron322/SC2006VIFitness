import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useAuth } from "@/hooks/AuthProvider";

function BarChartTest() {
  const { user } = useAuth();
  const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const chartSetting = {
    yAxis: [
      {
        label: 'Total Calories',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  const data = [
    {
      label: "Calories Taken",
      value: user.meals.calories,
    },
    {
      label: "Calories Burn",
      value: user.workouts.reduce((acc, cur) => acc + parseFloat(cur.calorie), 0),
    },
  ];

  const xLabel = [todayLabel]

  const valueFormatter = (value) => `${value}mm`;
  

  return (
    <BarChart
    dataset={data}
    xAxis={[{ scaleType: 'band', dataKey: 'dayOfWeek', tickValues: xLabel }]}
    series={[
      { dataKey: 'value', label: 'Calories Taken', valueFormatter },
      { dataKey: 'value', label: 'Calories Burn', valueFormatter },
    ]}
    {...chartSetting}
  />
  );
}
export default BarChartTest;

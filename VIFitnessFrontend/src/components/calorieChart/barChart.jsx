import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useAuth } from "@/hooks/AuthProvider";
import { format } from 'date-fns';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "@/routes/theme";


function BarChartTest(props) {
  const { user } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const now = format(new Date(), "PPP");
  const chartSetting = {
    yAxis: [
      {
        label: 'Total Calories',
        margins: {
          right: 100,
          bottom: 10,
      },
      },
    ],
    width: 700,  // Increase the width
    height: 380, // Increase the height
    // viewBox: '0 0 300 200',
    slotProps: {
      legend: {
        direction: 'column',
        position: { vertical: 'middle', horizontal: 'right' },
        padding: -15,
      },
    },
    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: 'translate(-20px, 0)',
    //   },
    // },
  };
  const legendPlacement = {
    
    slotProps: {
      legend: {
          direction: 'row',
          itemMarkWidth: 20,
          itemMarkHeight: 11,
          markGap: 14,
          itemGap: 15,
      },
    },
    // margin: {
    //   top: 20,
    //   right: 150,
    //   left: 20,
    // },
  };
  const data = [
    {
      dayOfWeek: props.xLabel,
      "Calories Taken": props.meals.reduce((acc, cur) => acc + (parseFloat(cur.calorie) || 0), 0),
      "Calories Burnt": props.workouts.reduce((acc, cur) => acc + (parseFloat(cur.calories) || 0), 0),
    },
  ];

  // const xLabel = [now]

  const valueFormatter = (value) => `${value}cal`;


  return (
      <div
        className=" text-lg font-semibold tracking-tight w-full mb-[-100]"
        style={{ color: colors.card.foreground }}
      >
          {props.title} Statistics

      <BarChart
        margin={{
          left: 150,
          right: 200,
          top: 50,
          bottom: 40,
        }}
        
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'dayOfWeek', tickValues: props.xLabel}]}
        series={[
          { dataKey: 'Calories Taken', label: 'Calories Taken', valueFormatter },
          { dataKey: 'Calories Burnt', label: 'Calories Burnt', valueFormatter },
        ]}
        // slotProps={{
        //   legend: {
        //     direction: 'row',
        //     itemMarkWidth: 20,
        //     itemMarkHeight: 11,
        //     markGap: 14,
        //     itemGap: 15,
        //   }
        // }}
        {...chartSetting}
        // {...legendPlacement}
      />
      </div>
  );
}
export default BarChartTest;

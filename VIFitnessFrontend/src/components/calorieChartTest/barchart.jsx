import React, { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { useAuth } from "@/hooks/AuthProvider";

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   'Page A',
//   'Page B',
//   'Page C',
//   'Page D',
//   'Page E',
//   'Page F',
//   'Page G',
// ];

function BarChartCalorie(props) {
  const [barChartData, setBarChartData] = useState([]);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [caloriesTakenData, setCaloriesTakenData] = useState([]); // State to store calorie data
  const [calorieBurnData, setCalorieBurnData] = useState([]);
  const { user } = useAuth();
  // useEffect(() => {
  //   setBarChartData([
  //     {
  //       label: "Calories Taken",
  //       value: props.meals.calorie
  //     },
  //     {
  //       label: "Calorie Burn",
  //       value: props.meals.fat
  //     },
  //   ]);
  // },[props]);
  const data = [
    {
      label: "Calories",
      value: props.meals.calories
    },
  ];
  
  // Log the 'value' for each object in the 'data' array
  
  useEffect(() => {
    setCaloriesTakenData([
      {
        label: "Calorie Taken",
        value: props.data.calories
      },
    ]);
    setCalorieBurnData([
      {
        label: "Calorie Burn",
        value: props.data.reduce(
          (acc, cur) => acc + parseFloat(cur.protein),
          0
        ),
      },
    ])
  }, [props]);

  const seriesData = [
    {
      label: "Calories Taken",
      data: caloriesTakenData,
      id: 'pvId'
    },
    {
      label: "Calorie Burn",
      data: calorieBurnData,
      id: 'uvId'
    }
  ];

  return (
    data.forEach(item => {
      console.log(`${item.label}: ${item.value}`);
      // console.log(props.data);
    })
  
    // <BarChart
    //   width={500}
    //   height={300}
    //   // series={[
    //   //   // { data: barChartData, label: 'Calorie Taken', id: 'pvId' },
    //   //   // { data: barChartData, label: 'Calorie Burn', id: 'uvId' },
    //   // ]}
    //   series={seriesData}
    //   xAxis={[
    //     {
    //       data: months, // Use the array of month names as xLabels
    //       scaleType: 'band'
    //     }
    //   ]}
    //   // xAxis={[{ data: xLabels, scaleType: 'band' }]}
    // />
  );
}

export default BarChartCalorie;

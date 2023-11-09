import React, { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { useAuth } from "@/hooks/AuthProvider";

function BarChartCalorie(props) {
  const [barChartData, setBarChartData] = useState([]);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [caloriesTakenData, setCaloriesTakenData] = useState([]); // State to store calorie data
  const [calorieBurnData, setCalorieBurnData] = useState([]);

  const data = [
    {
      label: "Calories Taken",
      value: props.data.reduce((acc, cur) => acc + cur.calorie, 0),
    },
    // { 
    //   label: "Calories Burn", 
    //   value: props.data.reduce((acc, cur) => acc + cur.calories, 0), 
    // },
  ];
  
  // Log the 'value' for each object in the 'data' array
  
  useEffect(() => {
    setBarChartData([
      {
        label: "Calorie Taken",
        data: props.data.reduce(
          (acc, cur) => {
            acc + parseFloat(cur.calorie);}
            ,
          0
        ),
      },
      // {
      //   label: "Calorie Burn",
      //   data: props.data.reduce(
      //     (acc, cur) => acc + parseFloat(cur.calories),
      //     0
      //   ),
      // },
    ]);
  }, [props]);

  // const seriesData = [
  //   {
  //     label: "Calories Taken",
  //     data: caloriesTakenData,
  //     id: 'pvId'
  //   },
  //   {
  //     label: "Calorie Burn",
  //     data: calorieBurnData,
  //     id: 'uvId'
  //   }
  // ];

  return (
    // data.forEach(item => {
    //   console.log(`${item.label}: ${item.value}`);
    //   // console.log(props.data);
    // })
  
    <BarChart
      width={500}
      height={300}
      // series={[
      //   // { data: barChartData, label: 'Calorie Taken', id: 'pvId' },
      //   // { data: barChartData, label: 'Calorie Burn', id: 'uvId' },
      // ]}
      series={[{data: barChartData,}]}
      xAxis={[
        {
          data: months, // Use the array of month names as xLabels
          scaleType: 'band'
        }
      ]}
      // xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}

export default BarChartCalorie;

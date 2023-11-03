import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

function PieChartMacros(props) {
  const [pieChartData, setPieChartData] = useState([]);
  const data = [
    {
      label: "Calories",
      value: props.data.reduce((acc, cur) => acc + cur.calories, 0),
    },
    { label: "Protein", value: 300 },
    { label: "Fats", value: 300 },
    { label: "Carbs", value: 200 },
  ];

  useEffect(() => {
    setPieChartData([
      {
        label: "Calories",
        value: props.data.reduce(
          (acc, cur) => acc + parseFloat(cur.calorie),
          0
        ),
      },
      {
        label: "Protein",
        value: props.data.reduce(
          (acc, cur) => acc + parseFloat(cur.protein),
          0
        ),
      },
      {
        label: "Fats",
        value: props.data.reduce((acc, cur) => acc + parseFloat(cur.fat), 0),
      },
      {
        label: "Carbs",
        value: props.data.reduce(
          (acc, cur) => acc + parseFloat(cur.carbohydrate),
          0
        ),
      },
    ]);
  }, [props]);

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }
  return (
    <PieChart
      series={[
        {
          // startAngle: -90,
          // endAngle: 90,
          paddingAngle: 5,
          innerRadius: 60,
          outerRadius: 80,
          cornerRadius: 5,
          data: pieChartData,
        },
      ]}
      // margin={{ right: 5 }}
      width={300}
      height={200}
    >
      <PieCenterLabel>Overview</PieCenterLabel>
    </PieChart>
  );
}

export default PieChartMacros;

import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

function PieChartMacros(props) {
  const data = [
    { label: "Calories", value: 400 },
    { label: "Protein", value: 300 },
    { label: "Fats", value: 300 },
    { label: "Carbohydrates", value: 200 },
  ];

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
          data: data,
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

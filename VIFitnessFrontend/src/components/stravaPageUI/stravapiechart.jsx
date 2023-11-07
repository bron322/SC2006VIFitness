import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "@/routes/theme";

function PieChartStrava(props) {
  const [pieChartData, setPieChartData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setPieChartData([
      {
        label: "Run",
        value: props.data.reduce(
          (acc, cur) => acc + (cur.type === "Run" ? cur.calorieBurned : 0),
          0
        ),
      },
      {
        label: "Swim",
        value: props.data.reduce(
          (acc, cur) =>
            acc + (cur.type === "Swim" ? parseFloat(cur.calorieBurned) : 0),
          0
        ),
      },
      {
        label: "Ride",
        value: props.data.reduce(
          (acc, cur) =>
            acc + (cur.type === "Ride" ? parseFloat(cur.calorieBurned) : 0),
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
      <StyledText x={left + width / 2} y={top + height / 2.4}>
        {children}
      </StyledText>
    );
  }
  function PieCenterLabel2({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 1.8}>
        {children}
      </StyledText>
    );
  }
  return (
    <div>
      <PieChart
        series={[
          {
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
        <PieCenterLabel>Calories</PieCenterLabel>
        <PieCenterLabel2>Burned (Cal)</PieCenterLabel2>
      </PieChart>
      <div className="flex justify-center">
        <h1 style={{ color: colors.accent.foreground }}>
          Total Calories Burned:{" "}
          {pieChartData.reduce((acc, cur) => acc + cur.value, 0)} Cal
        </h1>
      </div>
    </div>
  );
}

export default PieChartStrava;

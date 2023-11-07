import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "@/routes/theme";

function PieChartStravaDistance(props) {
  const [pieChartData, setPieChartData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // console.log(props.data);
    setPieChartData([
      {
        label: "Run",
        value: props.data.reduce(
          (acc, cur) => acc + (cur.type === "Run" ? cur.distance : 0),
          0
        ),
      },
      {
        label: "Swim",
        value: props.data.reduce(
          (acc, cur) =>
            acc + (cur.type === "Swim" ? parseFloat(cur.distance) : 0),
          0
        ),
      },
      {
        label: "Ride",
        value: props.data.reduce(
          (acc, cur) =>
            acc + (cur.type === "Ride" ? parseFloat(cur.distance) : 0),
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
        <PieCenterLabel>Distance (m)</PieCenterLabel>
      </PieChart>
      <div className="flex justify-center">
        <h1 style={{ color: colors.accent.foreground }}>
          Total Distance:{" "}
          {pieChartData.reduce((acc, cur) => acc + cur.value, 0)} m
        </h1>
      </div>
    </div>
  );
}

export default PieChartStravaDistance;

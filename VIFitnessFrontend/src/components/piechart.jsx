import React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Calories", value: 400 },
  { label: "Protein", value: 300 },
  { label: "Fats", value: 300 },
  { label: "Carbohydrates", value: 200 },
];

function PieChartLebron() {
  return (
    <Stack direction="row">
      <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            paddingAngle: 5,
            innerRadius: 60,
            outerRadius: 80,
            data,
          },
        ]}
        margin={{ right: 5 }}
        width={200}
        height={200}
        legend={{ hidden: true }}
      />
    </Stack>
  );
}

export default PieChartLebron;

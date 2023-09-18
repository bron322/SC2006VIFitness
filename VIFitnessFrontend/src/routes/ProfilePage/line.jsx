import { Box } from "@mui/material";
import Header from "./Chart/Header";
import LineChart from "./Chart/Line";

export default function Line () {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
}
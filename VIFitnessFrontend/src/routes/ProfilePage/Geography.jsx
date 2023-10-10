import { Box, useTheme } from "@mui/material";
import GeographyChart from "./Chart/Geo";
import Header from "./Chart/Header";
import { tokens } from "../theme";

export default function Geography() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.primary.default}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
}

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import ProgressCircle from "./Progress";

function StatBox ({ title, subtitle, icon, progress, increase }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" flex-direction = "row" >
      <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.accent.foreground }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h4" 
            fontWeight = "bold"
            sx={{ color: colors.accent.foreground }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
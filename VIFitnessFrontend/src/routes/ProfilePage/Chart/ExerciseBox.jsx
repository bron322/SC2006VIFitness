import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import ProgressCircle from "./Progress";

function ExerciseBox ({ title, subtitle, icon, progress, increase }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" flex-direction = "row" >
      <Box sx={{ flexDirection:"row" }} justifyContent="space-between">
          <Typography
            variant="h5"
            fontWeight="bold"
            mr = "55px"          
            sx={{ color: colors.accent.foreground }}
          >
            {title}
          </Typography>
      </Box>
      <Box sx={{ display: 'inline-flex' , flexDirection: 'row-reverse'}} justifyContent="space-between">
      <Typography 
            variant="h5" 
            fontWeight = "bold"
            sx={{ color: colors.accent.foreground }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default ExerciseBox;
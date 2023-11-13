import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import ProgressCircle from "./Progress";

function ExerciseBox({ title, subtitle, subsubtitle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" flexDirection='row'>
      <div className="flex justify-between">
        <div className="flex-col justify-between w-2/3">
          <Box sx={{ flexDirection: "row" }} justifyContent="space-between" >
            <Typography
              variant="h5"
              fontWeight="bold"
              mr="55px"
              sx={{ color: colors.accent.foreground }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: 'inline-flex', ml: 'auto' }} justifyContent="space-between" >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: colors.accent.foreground }}>
              Muscle Part: {subsubtitle}
            </Typography>
          </Box>
        </div>

        <Box sx={{ display: 'inline-flex', ml: 'auto' }} justifyContent="space-between" >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.accent.foreground }}>
            {subtitle}
          </Typography>
        </Box>

      </div>

    </Box>
  );
};

export default ExerciseBox;
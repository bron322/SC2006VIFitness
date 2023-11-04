import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

function ProgressCircle ({ progress = "0.75", size = "40" }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary.default} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.secondary.default} ${angle}deg 360deg),
            ${colors.secondary.default}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
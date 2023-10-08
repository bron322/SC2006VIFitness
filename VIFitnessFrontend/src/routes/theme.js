import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const themeColor = () => ({
  white: {
    100: "#ffffff", //white
    200: "#f8fafc", //white-grey1
    300: "#f1f5f9", //white-grey2
    400: "#e2e8f0", //white2
    500: "#080b12",
    600: "#040509",
  },
  blue: {
    100: "#020817", //black-blue
    200: "#2563eb", //light-blue
    300: "#0f172a", //dark-blue
    400: "#64748b", //grey-blue
    500: "#3b82f6", //light-blue2
    600: "#1e293b", //dark-blue2
    700: "#94a3b8", //light-blue3
    800: "#1d4ed8", //blue
  },
  red: {
    100: "#ef4444", //bright-red
    200: "#7f1d1d", //red
  },
});

// color design tokens export
export const tokens = (mode) => {
  const colors = themeColor();
  return {
    ...(mode === "light"
      ? {
          // palette values for dark mode
          background: {
            default: colors.white[100],
            foreground: colors.blue[100],
          },
          card: {
            default: colors.white[100],
            foreground: colors.blue[100],
          },
          popover: {
            default: colors.white[100],
            foreground: colors.blue[100],
          },
          primary: {
            default: colors.white[300],
            foreground: colors.white[200],
          },
          secondary: {
            default: colors.white[300],
            foreground: colors.blue[300],
          },
          muted: {
            default: colors.white[300],
            foreground: colors.blue[400],
          },
          accent: {
            default: colors.white[300],
            foreground: colors.blue[300],
          },
          destructive: {
            default: colors.red[100],
            foreground: colors.white[200],
          },
          border: {
            default: colors.white[400],
          },
          input: {
            default: colors.white[400],
          },
          ring: {
            default: colors.white[300],
          },
        }
      : {
          // palette values for light mode
          background: {
            default: colors.blue[100],
            foreground: colors.white[200],
          },
          card: {
            default: colors.blue[100],
            foreground: colors.white[200],
          },
          popover: {
            default: colors.blue[100],
            foreground: colors.white[200],
          },
          primary: {
            default: colors.blue[500],
            foreground: colors.blue[300],
          },
          secondary: {
            default: colors.blue[600],
            foreground: colors.white[200],
          },
          muted: {
            default: colors.blue[600],
            foreground: colors.blue[700],
          },
          accent: {
            default: colors.blue[600],
            foreground: colors.white[200],
          },
          destructive: {
            default: colors.red[200],
            foreground: colors.white[200],
          },
          border: {
            default: colors.blue[600],
          },
          input: {
            default: colors.blue[600],
          },
          ring: {
            default: colors.blue[800],
          },
        }),
  };
};

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary.default,
            },
            secondary: {
              main: colors.secondary.default,
            },
            neutral: {
              dark: colors.secondary.default,
            },
            background: {
              default: colors.background.default,
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary.default,
            },
            secondary: {
              main: colors.secondary.default,
            },
            neutral: {
              dark: colors.secondary.default,
            },
            background: {
              default: colors.background.default,
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0B1F3A", // deep solar navy
    },
    secondary: {
      main: "#16A34A", // solar green
    },
    warning: {
      main: "#F59E0B", // sun yellow
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: `"Inter", sans-serif`,

    h1: {
      fontWeight: 800,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      color: "#475569",
      lineHeight: 1.7,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 22px",
          borderRadius: 999,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
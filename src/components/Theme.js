// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6f3bff", // The purple color for buttons and header
    },
    secondary: {
      main: "#1976d2", //blue color
    },
    light: {
      main: "#faf8f7", // Light background color
    },
    text: {
      primary: "#000000", // Black text for headers
      secondary: "#131313", // Purple for some secondary text
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 600, // Bold header
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },

    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 20px", // Padding for buttons
          borderRadius: "15px", // Rounded corners for buttons
          textTransform: "none", // Avoid uppercase transformation
        },
        containedPrimary: {
          backgroundColor: "#303030",
          "&:hover": {
            backgroundColor: "#5e32e6",
          },
        },
        containedSecondary: {
          backgroundColor: "#faf8f7",
          color: "#6f3bff",
          "&:hover": {
            backgroundColor: "#5e32e6",
            color: "#faf8f7",
          },
        },
        containedLight: {
          backgroundColor: "#faf8f7",
          color: "#303030",
          "&:hover": {
            backgroundColor: "#5e32e6",
          },
        },
        transition: "background-color 0.8s ease", // Smooth transition
        "&:hover": {
          backgroundColor: "#ddd", // Background on hover
        },
        "&.Mui-selected": {
          backgroundColor: "#6f3bff", // Background when selected
          color: "#fff", // Text color when selected
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem", // Adjust the font size (e.g., 14px)
          color: "#757575", // Use grey color for the label text
          "&.Mui-focused": {
            color: "#757575", // Keep the label grey when focused
          },
        },
      },
    },
  },
});

export default theme;

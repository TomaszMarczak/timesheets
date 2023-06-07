import { createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

const customColors = {
  colors: {
    primary: "#6200ee",
    textPrimary: "#00000",
    secondary: "#03dac6",
    textSecondary: "#",
    background: `rgb(240,240,240)`,
    border: "#000",
    card: "#ffffff",
    text: "#000000",
    success: "#135E01",
  },
};

export default theme;

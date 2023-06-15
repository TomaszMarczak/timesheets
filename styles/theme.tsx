import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    text: "#000",
    border: "#000",
    card: "#fff",
    active: "#70acd4",
    primary: "#96d4709e",
    secondary: "#d47070",
  },
  darkColors: {
    text: "#e0e0e0",
    card: "#36364af8",
    border: "#c4c4c49f",
    active: "#70acd4a7",
    primary: "#6f7edf75",
    secondary: "#d47070af",
  },
  components: {
    Text: (props, theme) => ({
      style: {
        color: theme.colors.text,
      },
    }),
    Input: (props, theme) => ({
      inputStyle: {
        padding: 5,
        color: theme.colors.text,
      },
    }),
  },
  mode: "light",
});

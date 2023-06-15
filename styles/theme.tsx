import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    text: "#000",
    border: "#000",
    card: "#fff",
    active: "#96d470",
  },
  darkColors: {
    text: "#fff",
    card: "#333341ce",
    active: "#96d470",
    border: "#ffffff82",
  },
  components: {
    Text: (props, theme) => ({
      style: {
        color: theme.colors.text,
      },
    }),
  },
  mode: "light",
});

import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Container, SafeAreaView } from "../View";
import { Colors, useTheme } from "@rneui/themed";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = (props: LayoutProps) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  return (
    <SafeAreaView style={styles.outerLayout}>
      <Container style={styles.innerLayout}>{props.children}</Container>
    </SafeAreaView>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    innerLayout: {
      flex: 1,
      minWidth: "40%",
    },
    outerLayout: {
      alignItems: "center",
      minWidth: 400,
      padding: 10,
      flex: 1,
      backgroundColor: colors.background,
    },
  });

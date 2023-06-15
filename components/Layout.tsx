import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Container, SafeAreaView } from "./View";
import { useTheme } from "@rneui/themed";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = (props: LayoutProps) => {
  const { theme } = useTheme();
  const innerLayout = {
    marginHorizontal: "auto",
  };
  const outerLayout = {
    padding: 10,
    flex: 1,
    backgroundColor: theme.colors.background,
  };

  return (
    <SafeAreaView style={outerLayout}>
      <Container style={innerLayout}>{props.children}</Container>
    </SafeAreaView>
  );
};

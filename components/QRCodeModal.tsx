import { Colors, Overlay, Text, useTheme } from "@rneui/themed";
import QRCode from "react-native-qrcode-svg";
import { Subtitle } from "./Text";
import { View, StyleSheet, Dimensions } from "react-native";

interface QRCodeProps {
  value: string;
  handleClose: () => void;
  isVisible: boolean;
}

export const QRCodeModal = ({ value, isVisible, handleClose }: QRCodeProps) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  console.log(value);
  // Calculate the size of the QRCode based on the screen size
  const size = Dimensions.get("window").width * 0.5;

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={handleClose}
      overlayStyle={styles.overlay}
    >
      <Subtitle>Scan to join</Subtitle>
      <View style={styles.QRCodeContainer}>
        <QRCode
          value={value}
          size={size > 300 ? 300 : size}
          color={theme.colors.black}
          backgroundColor={theme.colors.white}
        />
      </View>
    </Overlay>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.card,
      paddingHorizontal: 100,
      paddingVertical: 20,
      borderRadius: 10,
    },
    QRCodeContainer: {
      backgroundColor: colors.card,
      margin: "auto",
      alignItems: "center",
    },
  });

import { Colors, Overlay, Text, useTheme } from "@rneui/themed";
import QRCode from "react-native-qrcode-svg";
import { Subtitle } from "./Text";
import { View } from "react-native";

interface QRCodeProps {
  value: string;
  handleClose: () => void;
  isVisible: boolean;
}

export const QRCodeModal = ({ value, isVisible, handleClose }: QRCodeProps) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={handleClose}
      overlayStyle={styles.overlay}
    >
      <Subtitle>Scan this QR code to join the project</Subtitle>
      <View style={styles.QRCodeContainer}>
        <QRCode
          value={value}
          color={theme.colors.black}
          backgroundColor={theme.colors.white}
        />
      </View>
    </Overlay>
  );
};

const makeStyles = (colors: Colors) => {
  return {
    overlay: {
      backgroundColor: colors.card,
      paddingHorizontal: 100,
      paddingVertical: 20,
      borderRadius: 10,
    },
    QRCodeContainer: {
      backgroundColor: colors.card,
      margin: "auto",
    },
  };
};

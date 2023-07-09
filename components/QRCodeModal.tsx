import { Colors, Overlay, Text, useTheme } from "@rneui/themed";
import QRCode from "react-native-qrcode-svg";
import { Subtitle } from "./Text";
import { View, StyleSheet, Dimensions } from "react-native";
import { ModalWrapper, ModalProps } from "./ModalWrapper";
import { Modal } from "react-native";

interface QRCodeModal extends ModalProps {
  value: string;
}

export const QRCodeModal = (props: QRCodeModal) => {
  const { value, closeModal, isVisible } = props;
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  // Calculate the size of the QRCode based on the screen size
  const size = Dimensions.get("window").width * 0.5;

  return (
    <ModalWrapper
      title="Scan to join"
      closeModal={closeModal}
      isVisible={isVisible}
    >
      <View style={styles.QRCodeContainer}>
        <QRCode
          value={value}
          size={size > 300 ? 300 : size}
          color={theme.colors.black}
          backgroundColor={theme.colors.white}
        />
      </View>
    </ModalWrapper>
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

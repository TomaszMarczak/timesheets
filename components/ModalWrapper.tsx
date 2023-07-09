import { Overlay, Colors, OverlayProps } from "@rneui/base";
import React from "react";
import { useTheme } from "@rneui/themed";
import { Title } from "./Text";

export interface ModalProps extends OverlayProps {
  closeModal: () => void;
  title?: string;
}

export const ModalWrapper = (props: ModalProps) => {
  const { closeModal, title, children, isVisible } = props;
  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={closeModal}
      overlayStyle={styles.overlay}
    >
      <Title>{title}</Title>
      {children}
    </Overlay>
  );
};
const makeStyles = (colors: Colors) => ({
  overlay: {
    backgroundColor: colors.card,
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 10,
    maxWidth: 500,
  },
});

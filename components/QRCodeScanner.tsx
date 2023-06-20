import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Colors, useTheme } from "@rneui/themed";
import { Container } from "./View";

export const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);

  const { theme } = useTheme();
  const styles = makeStyles(theme.colors);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      style={styles.absoluteFillObject}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    />
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    absoluteFillObject: {
      height: "100%",
      width: "100%",
      backgroundColor: colors.background,
    },

    scannedText: {
      color: colors.text,
    },
  });

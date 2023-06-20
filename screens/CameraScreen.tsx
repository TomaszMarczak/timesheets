import { Colors, useTheme } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useProjectsContext } from "../context/ProjectsContext";
import { set } from "zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../models/Routing";

export const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { theme } = useTheme();
  const { addProject } = useProjectsContext();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const styles = makeStyles(theme.colors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    setScannedData(null);
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (type == "256" && data !== scannedData) {
      setScannedData(data);
      const parsedData = JSON.parse(data);
      if (
        parsedData.id &&
        parsedData.name &&
        parsedData.owner &&
        parsedData.date &&
        parsedData.workingHours
      ) {
        addProject(parsedData);
        navigation.navigate("HomeScreen");
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <BarCodeScanner
        style={styles.absoluteFillObject}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        focusable={true}
      />
    </>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    absoluteFillObject: {
      position: "relative",
      height: "100%",
      width: "100%",
      backgroundColor: colors.background,
    },
    scannedText: {
      color: colors.text,
    },
  });

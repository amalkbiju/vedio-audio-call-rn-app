import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Typography } from "react-native-tillring-components";
import { Fonts } from "../constants";

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <Typography fFamily={Fonts.BOLD}>Landing Screen</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandingScreen;

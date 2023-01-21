import React from "react";
import { View, Text } from "react-native";
import { Button, Appbar } from "react-native-paper";

export default function CameraScreen({ navigation }) {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate("home")} />
      <Appbar.Content title="Scan QR Code" />
    </Appbar.Header>
  );
}

import React from "react";
import { View, Text } from "react-native";
import { Button, Appbar } from "react-native-paper";

export default function SummaryScreen({ navigation }) {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate("home")} />
      <Appbar.Content title="Summary" />
    </Appbar.Header>
  );
}

import React from "react";
import { View, Text } from "react-native";
import { Button, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SummaryScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("home")} />
        <Appbar.Content title="Summary" />
      </Appbar.Header>
    </SafeAreaView>
  );
}

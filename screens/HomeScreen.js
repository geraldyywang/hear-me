import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Hear Me" />
        <Appbar.Action
          icon="qrcode"
          onPress={() => navigation.navigate("camera")}
        />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.content}>
        <Text>Fill in with cards</Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Request Stop
        </Button>

        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Summarize
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: 40,
  },
});

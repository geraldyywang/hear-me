import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Card({ text, classification }) {
  let color = "#fff";

  if (classification == "Assistance") {
    // emergency
    color = "#FF0000";
  } else if (classification == "Delay") {
    // delays
    color = "#FFA500";
  } else if (classification == "Next Stop") {
    // stop
    color = "#0DFF00";
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardBlock} backgroundColor={color}></View>
        <Text>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardBlock: {
    borderRadius: 6,
    paddingBottom: 10,
  },
});

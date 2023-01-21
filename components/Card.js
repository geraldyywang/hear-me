import React from "react";
import { StyleSheet } from "react-native";

export default function Card(props) {
  let color = "#fff";

  if (props.keyword == "emergency") {
    color = "#FF0000";
  } else if (props.keyword == "") {
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text>{props.message}</Text>
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
});

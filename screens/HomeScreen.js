import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Card from "../components/Card";

export default function HomeScreen({ navigation }) {
  // Need to fix flat list, somehow pass props into Card, and then render the cards in the flatlist

  let messages = [<Card keyword="emergency" message="Cards" />];

  const [listState, setListState] = useState(messages);

  const addElementToList = (i, t) => {
    let tempArray = [...listState, { id: i, text: t }];
    setListState(tempArray);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Hear Me" />
        <Appbar.Action
          icon="qrcode"
          onPress={() => navigation.navigate("camera")}
        />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={listState}
          renderItem={(item) => <Text>{item.item.text}</Text>}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonStyle}>
          <Button
            icon={<Icon name="hand-stop-o" size={15} color="white" />}
            title="  Request Stop"
          />
          <Button
            icon={<Icon name="paragraph" size={15} color="white" />}
            title="  Summarize"
            onPress={() => navigation.navigate("summary")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footer: {
    padding: 20,
    borderTopColor: "#000",
    borderTopWidth: 1,
    backgroundColor: "#fff",
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 5,
  },
});

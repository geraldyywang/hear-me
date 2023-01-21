import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Card from "../components/Card";

import { db } from "../firebaseConfig";

import { collection, getDocs } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  let messages = [
    { id: 1, text: "Message 1", classification: "Delay" },
    { id: 2, text: "Message 2", classification: "Assistance" },
    { id: 3, text: "Message 3", classification: "Next Stop" },
    { id: 4, text: "Message 4", classification: 4 },
  ];

  const [listState, setListState] = useState(messages);

  const getAnnouncements = () => {
    const announcementColRef = collection(db, "announcements");
    getDocs(announcementColRef)
      .then((response) => {
        const announcements = response.docs.map((document) => {
          return {
            id: document.data().announcement_timestamp,
            text: document.data().announcement,
            classification: document.data().announcement_type,
          };
        });
        console.log(announcements);
        setListState(announcements);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAnnouncements();
    return () => {};
  }, []);

  // const addElementToList = (i, c, t) => {
  //   // setListState((prevValue) => {
  //   //   let tempArray = [...prevValue, { id: i, text: t, classification: c }];
  //   //   return tempArray;
  //   // });
  // };

  const renderCard = ({ item }) => {
    const { text, classification } = item;

    return <Card classification={classification} text={text} />;
    //return <Text>Hi</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="HearMe" />
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
          renderItem={renderCard}
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
  stopButtonStyle: {
    color: "red",
  },
});

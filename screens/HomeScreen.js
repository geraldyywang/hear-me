import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { Button } from "react-native-elements";
import FeatherIcon from "react-native-vector-icons/Feather";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Card from "../components/Card";
import uuid from "react-native-uuid";

import { train2ColRef, train1ColRef } from "../firebaseConfig";

import { onSnapshot } from "firebase/firestore";

export default function HomeScreen({ route, navigation }) {
  const [train, setTrain] = useState(route.params?.train || "train_1");

  const [listState, setListState] = useState([]);

  const [notifications, setNotifications] = useState(true);
  // useEffect(() => {
  //   setTrain(route.params?.train || "train_1");
  // }, [route.params?.train]);
  // const getAnnouncements = () => {
  //   const announcementColRef = collection(db, "announcements");
  //   getDocs(announcementColRef)
  //     .then((response) => {
  //       const announcements = response.docs.map((document) => {
  //         return {
  //           id: document.data().announcement_timestamp,
  //           text: document.data().announcement,
  //           classification: document.data().announcement_type,
  //         };
  //       });
  //       console.log(announcements);
  //       setListState(announcements);
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      train === "train_1" ? train1ColRef : train2ColRef,
      (snapshot) => {
        const announcements = snapshot.docs.map((document) => {
          return {
            id: uuid.v4(),
            text: document.data().announcement,
            classification: document.data().announcement_type,
          };
        });
        setListState(announcements);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  // const addElementToList = (i, c, t) => {
  //   // setListState((prevValue) => {
  //   //   let tempArray = [...prevValue, { id: i, text: t, classification: c }];
  //   //   return tempArray;
  //   // });
  // };

  const renderCard = ({ item }) => {
    const { text, classification } = item;

    return <Card key={item.id} classification={classification} text={text} />;
    //return <Text>Hi</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="HearMe" />
        <Appbar.Action
          icon="qrcode"
          onPress={() => navigation.navigate({ name: "init", merge: true })}
        />
        <Appbar.Action
          icon={notifications ? "bell" : "bell-off"}
          onPress={() => setNotifications(!notifications)}
        />
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
            style={styles.stopButtonStyle}
            icon={<FAIcon name="hand-stop-o" size={15} color="white" />}
            title="  Set Stop"
          />
          <Button
            icon={<FAIcon name="paragraph" size={15} color="white" />}
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

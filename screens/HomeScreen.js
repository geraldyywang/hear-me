import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Vibration,
  Text,
} from "react-native";
import {
  FAB,
  Modal,
  Portal,
  Provider,
  Switch,
  useTheme,
  Dialog,
  IconButton,
} from "react-native-paper";
import { Button, Image } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Card from "../components/Card";
import uuid from "react-native-uuid";
import stopData from "../stops.json";
import { Picker } from "@react-native-picker/picker";

import { train2ColRef, train1ColRef } from "../firebaseConfig";

import { onSnapshot } from "firebase/firestore";

export default function HomeScreen({ route, navigation }) {
  const [train, setTrain] = useState(route.params?.train || "train_1");
  const [open, setOpen] = useState(false);
  const [listState, setListState] = useState([]);
  const [notifications, setNotifications] = useState(true);
  const [stop, setStop] = useState();
  const [currentStop, setCurrentStop] = useState(0);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [nextStops, setNextStops] = useState(true);
  const [assistances, setAssistances] = useState(true);
  const [delays, setDelays] = useState(true);
  const theme = useTheme();

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
        announcements.reverse();
        setListState(announcements);
      }
    );
    const interval = setInterval(() => {
      setCurrentStop((prevValue) => {
        return prevValue + 1;
      });
    }, 5000);
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentStop === stop) {
      console.log("you made it 🥳");
      if (notifications) {
        Vibration.vibrate([100, 100, 100], true);
      }
      setDialogVisible(true);
    }

    return () => {};
  }, [currentStop]);

  const renderCard = ({ item }) => {
    const { text, classification } = item;

    return <Card key={item.id} classification={classification} text={text} />;
    //return <Text>Hi</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomColor: "#000",
          borderBottomWidth: 1,
          backgroundColor: "#FFF",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("./logo.jpg")}
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>Hear.Me</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="qrcode"
            onPress={() => navigation.navigate({ name: "init", merge: true })}
          />
          <IconButton
            icon={notifications ? "bell" : "bell-off"}
            onPress={() => setNotifications(!notifications)}
          />
        </View>
      </View>

      {/* <Appbar.Header style={styles.header}>
        <Appbar.Content title="Hear.Me" />
        <Appbar.Action />
        <Appbar.Action
          icon={notifications ? "bell" : "bell-off"}
          onPress={() => setNotifications(!notifications)}
        />
      </Appbar.Header> */}

      <Provider>
        <View style={styles.content}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={listState.filter((value) => {
              if (
                (assistances && value.classification === "Assistance") ||
                (nextStops && value.classification === "Next Stop") ||
                (delays && value.classification === "Delay")
              )
                return value;
            })}
            renderItem={renderCard}
          />
          <FAB
            icon="filter"
            label="Filters"
            style={{
              position: "absolute",
              left: 15,
              bottom: 15,
            }}
            onPress={() => {
              setFilterModalVisible(true);
            }}
          />
          <FAB
            label={stop == null ? "Set Stop" : stopData[train][stop]}
            color={stop == null ? theme.colors.primary : "#FF0000"}
            icon="hand-back-right"
            style={{
              position: "absolute",
              right: 15,
              bottom: 15,
            }}
            onPress={() => {
              setStopModalVisible((prevValue) => !prevValue);
            }}
          />
          <Portal>
            <Dialog
              visible={dialogVisible}
              onDismiss={() => {
                setDialogVisible((prevValue) => !prevValue);
                Vibration.cancel();

                setTimeout(() => {
                  navigation.navigate({ name: "init", merge: true });
                }, 1000);
              }}
            >
              <Dialog.Title>Stop Reached</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">You have reached your stop! 🥳</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setDialogVisible((prevValue) => !prevValue);
                    Vibration.cancel();
                    setTimeout(() => {
                      navigation.navigate({ name: "init", merge: true });
                    }, 1000);
                  }}
                >
                  Done
                </Button>
              </Dialog.Actions>
            </Dialog>
            <Modal
              visible={filterModalVisible}
              onDismiss={() => setFilterModalVisible((prevValue) => !prevValue)}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                margin: 20,
                borderRadius: 10,
              }}
            >
              <View style={styles.subcontainer}>
                <Text>Next Stop Announcements</Text>
                <Switch
                  value={nextStops}
                  onValueChange={() => setNextStops((prevValue) => !prevValue)}
                />
              </View>
              <View style={styles.subcontainer}>
                <Text>Assistance Announcements</Text>

                <Switch
                  value={assistances}
                  onValueChange={() =>
                    setAssistances((prevValue) => !prevValue)
                  }
                />
              </View>
              <View style={styles.subcontainer}>
                <Text>Delay Announcements</Text>
                <Switch
                  value={delays}
                  onValueChange={() => setDelays((prevValue) => !prevValue)}
                />
              </View>
            </Modal>
            <Modal
              visible={stopModalVisible}
              onDismiss={() => setStopModalVisible((prevValue) => !prevValue)}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                margin: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Pick a stop:
              </Text>
              <Picker
                selectedValue={stop}
                onValueChange={(itemValue) => {
                  setStop(itemValue);
                }}
              >
                {stopData[train].map((stop, index) => (
                  <Picker.Item key={index} label={stop} value={index} />
                ))}
              </Picker>
              <Button
                title="Ok"
                onPress={() => {
                  setStopModalVisible(false);
                }}
              />
            </Modal>
          </Portal>
        </View>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  subcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 10,
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import InitialScannerScreen from "./screens/InitialScannerScreen";

const StackNavigator = createNativeStackNavigator();

function Stack() {
  return (
    <StackNavigator.Navigator initialRouteName="init">
      <StackNavigator.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="init"
        component={InitialScannerScreen}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

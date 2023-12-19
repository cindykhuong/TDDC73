// import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import * as React from "react";
import { Appbar, PaperProvider, Button, TextInput } from "react-native-paper";

export default function App() {
  console.log("HEJ");
  return (
    <PaperProvider>
      <View style={styles.container}>
        <AppBar />
        <ImageFun />
        <ButtonRow />
        <ButtonRow />
        <TextRow />
      </View>
    </PaperProvider>
  );
}

function AppBar() {
  return (
    <Appbar
      style={{
        backgroundColor: "#418577",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      <Appbar.Content title="Example 1" color="#fff" />
    </Appbar>
  );
}

function ImageFun() {
  return (
    <Image
      source={require("./Image/pingu.png")}
      style={{ width: 150, height: 150, marginTop: 100 }}
    ></Image>
  );
}

function ButtonFun() {
  return (
    <Pressable
      style={{
        backgroundColor: "#d3d3d3",
        textColor: "black",
        padding: 10,
        borderRadius: 4,
      }}
      onPress={() => console.log("Pressed")}
    >
      <Text style={{ fontWeight: "bold" }}>Button</Text>
    </Pressable>
  );
}

function ButtonRow() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        padding: 20,
      }}
    >
      <ButtonFun />
      <ButtonFun />
    </View>
  );
}

function TextRow() {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Text style={{ marginLeft: 25, marginRight: 40, fontSize: 15 }}>
        Email
      </Text>

      <TextInput
        underlineColor="#d60f69"
        activeUnderlineColor="#d60f69"
        cursorColor="#d60f69"
        style={{ backgroundColor: "white", width: "50%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: "50vh",
  },
});

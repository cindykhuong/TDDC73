// Description: Main application. Calls the components
//              Password and Carousel to be display on the Android screen
// Author: Cindy Khuong & Rebecca Sjödin

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Carousel from "./components/Carousel";
import Password from "./components/Password";

// Data information used in the component carousel
const data = [
  { id: "1", image: require("./images/image1.jpg"), title: "Findus",},
  { id: "2", image: require("./images/image2.jpg"), title: "Sixten",},
  { id: "3", image: require("./images/image3.jpg"), title: "Sigge",},
  { id: "4", image: require("./images/image2.jpg"), title: "Smulan",},
  { id: "5", image: require("./images/image3.jpg"),title: "Adam",},
  { id: "6", image: require("./images/image4.jpg"), title: "Millan",},
  { id: "7", image: require("./images/image5.jpg"), title: "Sillan",},
  { id: "8", image: require("./images/image6.jpg"), title: "Doris",}
];

// Show single image grid of 4 per page
// true: show grid
// false: show single
const showMultipleImages = true;

// Display strengthbar
const isStrengthBarVisible = true;

// Default settings for password strength criteria and colors
const defaultPasswordSettings = {
  criteria: {
    minLength: 5,
    weakLength: 8,
    fairLength: 12,
    goodLength: 15,
    hasLowerCase: /[a-z]/,
    hasUpperCase: /[A-Z]/,
    hasNumber: /\d/,
  },
  colors: {
    //test: #FFA500
    tooShort: "#787777",
    weak: "#ba5450",
    fair: "#f5f184",
    good: "#5ab7cc",
    strong: "#439154",
    needsMoreComplexity: "#787777",
  },
};

export default function App() {

  // State to store the saved password
  const [savedPassword, setSavedPassword] = React.useState("");

  // Callback function to handle password changes
  const handlePasswordChange = (password) => {
    // Save the received password in the component state
    setSavedPassword(password);
  };

  // Function to determine the render mode based on a condition
  const renderModeFunction = () => {
    return showMultipleImages ? "renderGridItem" : "renderItem";
  };

  return (
    <ImageBackground
      source={require("./images/background2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Kittenland</Text>
        </View>

        {/* Carousel component with data and render mode */}
        <Carousel data={data} renderMode={renderModeFunction()} />

        {/* Password component with settings, strength bar visibility, and callback */}
        <Password
          passwordSettings={defaultPasswordSettings}
          showStrengthBar={isStrengthBarVisible}
          onPasswordChange={handlePasswordChange} //update password
          password = {savedPassword} //current and saved password
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  topBar: {
    width: "100%",
    height: 70,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  topBarText: {
    color: "white",
    fontSize: 20,
  },
});
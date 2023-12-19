// Description: Component for password input with a strength indicator and a
//              strength bar based on criteria such as length and character types
// Authors: Cindy Khuong, Rebecca Sjödin

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Password({
  passwordSettings,
  showStrengthBar,
  onPasswordChange,
  password,
}) {
  // State declaration
  const [barWidth, setBarWidth] = useState("0%");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Function to calculate password strength based on length
  const getPasswordStrength = (password) => {
    const strength = password.length;
    return strength;
  };

  //Set criteria and colors for the password strength
  const getPasswordStrengthText = (strength, password) => {
    if (!passwordSettings) return { text: "", color: "" };
    const criteria = passwordSettings.criteria;
    const colors = passwordSettings.colors;

    const {
      minLength,
      weakLength,
      fairLength,
      goodLength,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
    } = criteria;

    let strengthText = ""; 
    let colorCode = ""; 
    const hasLower = hasLowerCase.test(password);
    const hasUpper = hasUpperCase.test(password); 
    const hasNum = hasNumber.test(password);

    if (strength < minLength) {
      (strengthText = "Too Short"), (colorCode = colors.tooShort);
    } //gray
    else if (strength < weakLength && hasLower && hasUpper && hasNum) {
      (strengthText = "Weak"), (colorCode = colors.weak);
    } //red
    else if (strength < fairLength && hasLower && hasUpper && hasNum) {
      strengthText = "Fair";
      colorCode = colors.fair;
    } else if (strength < goodLength && hasLower && hasUpper && hasNum) {
      strengthText = "Good";
      colorCode = colors.good;
    } else if (strength >= goodLength && hasLower && hasUpper && hasNum) {
      strengthText = "Strong";
      colorCode = colors.strong;
    } else {
      strengthText = "Needs more complexity";
      colorCode = colors.needsMoreComplexity;
    }

    return {
      text: strengthText,
      color: colorCode,
    };
  };

  // Create variables for the strength bar
  const strength = getPasswordStrength(password);
  const strengthInfo = getPasswordStrengthText(strength, password);
  const barColor = strengthInfo.color;
  const strengthText = strengthInfo.text;

  //Update strength bar width and text when password changes
  useEffect(() => {
    const maxPasswordLength = 20;

    // Calculate the percentage of password length relative to max length
    // Update the width of the strength bar based on the calculated percentage
    const percentage = (password.length / maxPasswordLength) * 73;
    const strengthInfo = getPasswordStrengthText(strength, password);
    const strengthText = strengthInfo.text;

    //update the bar depending on strengthText
    if (strengthText === "Too Short" || strengthText === "Needs more complexity") {
      // Keep the bar width unchanged
      setBarWidth("0%");
    } else {
      setBarWidth(percentage + "%"); //Update the width bar
    }
  }, [password]);

  return (
    <View style={styles.bodyContainer}>
      {/* Password input and tooltip visibility toggle */}
      <View style={styles.passwordContainer}>

        <Text style={styles.textPassword}>Password: </Text>

        <TextInput
          style={styles.passwordInput}
          autoComplete="password"
          placeholder="Password"
          secureTextEntry={true} //censore thr password
          onChangeText={(text) => {
            // console.log("Password changed:", text);
            onPasswordChange(text); //update the password
          }}
          maxLength={20}
          value={password}
        ></TextInput>

        {/* Toggle tooltip visibility */}
        <TouchableOpacity onPress={() => setTooltipVisible(!tooltipVisible)}>
          <Text style={styles.questionMark}>?</Text>
        </TouchableOpacity>

      </View>
      {/* Password strength indicator */}
      <View style={styles.strengthContainer}>
        <Text style={styles.strengthText}>
          Password Strength: {strengthText}
        </Text>

        {/* show the strength of the bar and set style */}
        {showStrengthBar && (
          <View>
            <View style={styles.maxWidthBar} />
            <View
              style={[
                styles.strengthBar,
                { backgroundColor: barColor, width: barWidth },
              ]}
            />
          </View>
        )}

        {/* If tooltipVisible is true, show password criteria */}
        {tooltipVisible && (
          <View style={styles.passwordInfo}>
            <Text>Password must include: </Text>
            <Text>At least 1 uppercase letter</Text>
            <Text>At least 1 lowercase lettter</Text>
            <Text>At least 1 number</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    width: "100%",
    height: "40%",
    //backgroundColor: "#36454f",
    //justifyContent: "center",
    marginTop: 20,
  },
  passwordContainer: { flexDirection: "row", marginLeft: 60 },
  textPassword: {
    color: "white",
    fontWeight: "bold",
    padding: 5,
  },
  passwordInput: {
    borderWidth: 1,
    borderRadius: 7,
    width: 180,
    height: 30,
    paddingVertical: 2,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  strengthContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    marginLeft: 75,
  },
  strengthBar: {
    minHeight: 10,
    marginTop: 5,
    minWidth: 10,
    position: "absolute",
  },
  maxWidthBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    width: 245, // Max width
    marginTop: 5,
  },
  passwordInfo: {
    marginVertical: 30,
    marginHorizontal: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  strengthText: {
    color: "white",
    fontWeight: "bold",
  },
  questionMark: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
  },
  tooltip: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

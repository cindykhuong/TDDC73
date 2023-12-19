import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from "./Components/Card";
import CardForm from "./Components/CardForm";
import { useState } from 'react';

const inputStates = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'FULL NAME',
  cardMonth: 'MM',
  cardYear: 'YY',
  cardCvv: ' ',
  isCardFlipped: false,
};

export default function App() {
  const [state, setState] = useState(inputStates);

  // Handle input change 
  const handleInputChange = (keyName, value) => {
    setState({
      ...state,
      [keyName]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card state={state} />
        <View style={styles.cardform}>
        <CardForm state={state} onUpdateState={handleInputChange}/>
        </View>
      </View>

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
    
  cardContainer: {
    flex: 4,
    // margin: 15,
  },
  cardform: {
    // flex: 1.8,
    marginTop: "80%",
    height: "100%",
  }


});

import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import FastImage from 'react-native-fast-image';


const image = require("../images/6.jpeg");
const chip = require("../images/chip.png");

const Card = ({state}) => {

    const getCardType = () => {
        const number = state.cardNumber;
        
      
        // Check if the number is a non-null string
        if (typeof number === 'string' && number.trim().length > 0) {
          if (number.match(/^(34|37)/) !== null) return 'amex';
          if (number.match(/^5/) !== null) return 'mastercard';
          if (number.match(/^6011/) !== null) return 'discover';
          if (number.match(/^9792/) !== null) return 'troy';
          if (number.match(/^30|36|38/) !== null) return 'dinersclub';
        //   if (number.match(/^4/) !== null) return 'visa';
        }
      
        return 'visa'; // default type
      };

      const [animatedCardNumber] = useState(new Animated.Value(0));

      useEffect(() => {
        // Trigger flip animation when cardNumber changes
        Animated.timing(animatedCardNumber, {
          toValue: state.isCardFlipped ? 180 : 0,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: false, // Important for Android
        }).start();
      }, [state.isCardFlipped, state.cardNumber]);
  
      const rotateY = animatedCardNumber.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      });
      
      const scaleX = animatedCardNumber.interpolate({
        inputRange: [90, 180], // A range around 90 degrees
        outputRange: [-1, -1], // Apply scaleX: -1 at the midpoint to avoid mirroring
      });

    const FrontCard = () => {

        const [formattedCardNumber, setFormattedCardNumber] = useState("#### #### #### ####");

        useEffect(() => {
          const updateFormattedCardNumber = () => {
            const cardNumberWithoutSpaces = state.cardNumber.replace(/\s/g, "");
            let maskedNumber;

            if(state.cardNumber.startsWith("34") || state.cardNumber.startsWith("37")) {
              maskedNumber = "#### ###### #####";
            } 
            else if(state.cardNumber.startsWith("30") || state.cardNumber.startsWith("36") || state.cardNumber.startsWith("38")) {
              maskedNumber = "#### ###### ####";
            }
            else {
              maskedNumber = "#### #### #### ####";
            }
            let newFormattedNumber = "";
            let j = 0;

            for(let i = 0; i < maskedNumber.length; i++) {
              if(maskedNumber[i] === "#") {
                newFormattedNumber += cardNumberWithoutSpaces[j] || "#";
                j++;
              }
              else {
                newFormattedNumber += maskedNumber[i];
              }
            }

            setFormattedCardNumber(newFormattedNumber);
          };
          updateFormattedCardNumber();
        }, [state.cardNumber]);
      
        return (

          <Animated.View style={[styles.container, { transform: [{ rotateY }] }]}>
            <ImageBackground source={image} style={styles.card}>
              <View style={styles.rowContainer}>
                <Image source={chip} style={styles.chip}></Image>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType()}.png`,
                  }}
                  style={styles.cardtype}
                  resizeMode={FastImage.resizeMode.contain}
                ></Image>
              </View>
              
              <Text style={styles.cardnumber}>
                {formattedCardNumber}
              </Text>
              <View style={styles.rowContainer}>
                <View>
                  <Text style={{ color: 'gray' }}>Card Holder</Text>
                  <Text style={styles.cardHolder}>{state.cardHolder} </Text>
                </View>
                <View>
                  <Text style={{ color: 'gray' }}>Expires</Text>
                  <Text style={styles.expire}>{state.cardMonth}/{state.cardYear} </Text>
                </View>
              </View>
            </ImageBackground>
          </Animated.View>
        );
      };

    const BackCard = () => {
        return(
          <Animated.View style={[styles.container, { transform: [{ perspective: 1000 }, { rotateY }, { scaleX }] }]}>

                
            <ImageBackground source={image} style={styles.card}>
                <View style={styles.blackLine}></View>
                <View style={styles.backCard}>
                    <Text style={{ color: 'white', width:"100%", textAlign:"right", paddingRight: 10 }}>CVV</Text>
                    <Text style={styles.cardCvv}>{state.cardCvv}</Text>

                </View>
                <Image 
                    style={styles.something}
                    source={{uri: `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType()}.png`,}}
                    resizeMode={FastImage.resizeMode.contain}
                ></Image>



            </ImageBackground>
        </Animated.View>
        );

    };

    return state.isCardFlipped ? <BackCard/> : <FrontCard/>;


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        top: 80,
    },

    card: {
        width: 370, // Adjust the width as needed
        height: 250, // Adjust the height as needed
        resizeMode: 'cover',
        borderWidth: 0,
        borderRadius: 15,
        overflow: 'hidden',
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: 'space-between', 
        // alignItems: 'center', // Optional: Align items vertically
        padding: 23, 
        paddingBottom: 1
        
    },
    chip: {
        height: 50,
        width: 70,
        resizeMode: 'cover',

    },
    cardtype: {
        height: 45,
        width: 75,
        resizeMode: 'cover',
    },
    cardnumber: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        color: "white",
        marginHorizontal: 20,
        marginTop: 40,
        marginEnd: 50,
        padding: 6,
    },
    cardHolder: {
        color: "white",
        fontSize: 15,
        textTransform: 'uppercase', // Add this property to capitalize the text


    },
    expire: {
        color: "white",
        fontSize: 15,
    },

    //back of the card
    blackLine: {
        height: 60,
        backgroundColor: 'black',
        marginTop: 30, 
    },
    backCard: {
        flex: 1,
        alignItems: 'center', // Center the content horizontally
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    cardCvv: {
        fontSize: 20,
        color: 'black',
        width: "100%",
        textAlign: "right",
        backgroundColor: 'white',
        padding: 8,
        },
    something: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        height: 45,
        width: 75,
        resizeMode: 'cover',
        // backgroundColor: "blue",
        margin: 20
        
         
    }
});
export default Card;
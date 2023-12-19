import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const CardForm = ({ state, onUpdateState }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');

    const onCardNumberChange = (text, name) => {
        // Replace everything except numbers
        const numericText = text.replace(/[^0-9]/g, '');
    
        // Determine the card type based on the starting digits
        let cardType = 'default';
        if (/^3[47]/.test(numericText)) {
            cardType = 'amex';
        } else if (/^3[068]/.test(numericText)) {
            cardType = 'mastercard';
        }
    
        // Determine the spacing format based on the card type
        let spacing;
        if (cardType === 'amex') {
            spacing = [3, 9, 14]; // #### ###### #####
        } else if (cardType === 'mastercard') {
            spacing = [3, 9, 13]; // #### ###### ####
        } else {
            spacing = [3, 7, 11, 15];
        }


        // Adjust the maximum length based on the spacing
        const maxLength = spacing.length > 0 ? spacing[spacing.length - 1] + 1 : 0;
    
        // Apply the custom spacing to the numeric text
        let formattedText = '';
        let charIndex = 0;
        for (let i = 0; i < maxLength; i++) {
            formattedText += numericText[charIndex] || '';
            if (spacing.includes(i)) {
                formattedText += ' ';
            }
            charIndex += 1;
        }
    
        setCardNumber(formattedText);
        onUpdateState(name, formattedText);
    };
    

    const onCardHolderChange = (text, name) => {
        let cardHolder = text;
        //Replace everything except letters
        text = text.replace(/[^A-Za-z\s]/g, '');

        setCardHolder(text);
        onUpdateState(name, cardHolder);
      };

    

    return(
        <Card style={styles.container}>
            <Card.Content style={styles.card}>

                <View style={styles.space}>
                    <Text style={styles.text}>Card Number</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(text) => onCardNumberChange(text, 'cardNumber')}
                        value={cardNumber}
                        // maxLength={16}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.space}>
                    <Text style={styles.text}>Card Holder</Text>

                    <TextInput style={styles.textInput}
                        onChangeText={(text) => onCardHolderChange(text, 'cardHolder')}
                        value={cardHolder}
                        maxLength={25}
                        keyboardType='default'
                    />
                </View>

                <View style={styles.row}>
                    <Text>Expiration Date</Text>
                    <Text>CVV</Text>

                </View>


                    <View style={styles.row}>
                    <View style={styles.picker}>
                    <RNPickerSelect
                        selectedValue={state.cardMonth}
                        onValueChange={(value) => onUpdateState('cardMonth', value)}
                        placeholder={{ label: 'Month', value: null}}
                        items={[
                            { label: '01', value: '01' },
                            { label: '02', value: '02' },
                            { label: '03', value: '03' },
                            { label: '04', value: '04' },
                            { label: '05', value: '05' },
                            { label: '06', value: '06' },
                            { label: '07', value: '07' },
                            { label: '08', value: '08' },
                            { label: '09', value: '09' },
                            { label: '10', value: '10' },
                            { label: '11', value: '11' },
                            { label: '12', value: '12' },
                        ]}
                    />
                    </View>

                    <View style={styles.picker}>
                        <RNPickerSelect
                            selectedValue={state.cardYear}
                            onValueChange={(value) => onUpdateState('cardYear', value)}
                            placeholder={{ label: 'Year', value: null}}
                            items={[
                                { label: '2023', value: '2023' },
                                { label: '2024', value: '2024' },
                                { label: '2025', value: '2025' },
                                { label: '2026', value: '2026' },
                                { label: '2027', value: '2027' },
                                { label: '2028', value: '2028' },

                            ]}
                        />
                    </View>

                    <View>
                        <TextInput style={styles.CVV}
                            onChangeText={(text) => onUpdateState('cardCvv', text)}
                            onFocus={() => onUpdateState('isCardFlipped', true)}
                            onBlur={() => onUpdateState('isCardFlipped', false)}
                            maxLength={4}
                            textContentType="creditCardNumber"
                            value={state.cvv}
                            keyboardType="numeric"
                        />
                    </View>

                    


                </View>
                        <TouchableOpacity style={styles.submit}>
                            <Text style={{color:"white",fontSize: 16, textAlign: "center", fontWeight: "bold"}}>Submit</Text>
                        </TouchableOpacity>
                



            </Card.Content>

        </Card>




    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    card: {
        backgroundColor: "white",
        margin: 9,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "gray", 
        padding: 10,
    },
    text:{
        paddingBottom: 4,
    },
    space: {
        paddingBottom: 20,
    },
    picker: {
        
        borderWidth: 1,
        borderColor: "gray", 
        height: 40,
        width: 120,
        justifyContent: "center",
        padding: 5,
    },
    row:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent: 'space-between', 
        
    },
    CVV: {
        height: 40,
        width: 90,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
    },
    submit: {
        backgroundColor: "#1359d1",
        marginVertical: 20,
        padding: 10,
        borderRadius: 5

    }


})

export default CardForm;
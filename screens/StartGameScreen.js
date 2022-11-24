import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen({onPickNumber}) {

    const [enteredNumber, setEnteredNumber] = useState('');
    
    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        
        const chosenNumber = parseInt(enteredNumber);
        console.log('Number -> ' + chosenNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // show alert
            Alert.alert(
                'Invalid Number', 
                'Insert correct number!',
                [{ text: 'OOOOK', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        console.log('Valid Number.');
        onPickNumber(chosenNumber);
    }


    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.numberInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize="none" 
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enteredNumber}/>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>              
            </View>

        </View>
    );
}

export default StartGameScreen;

/** Per l'ombra si usa 'elevation' per Android e le varie 'shadow' per iOS */
const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.primary900,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})
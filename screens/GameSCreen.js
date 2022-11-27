import { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native'
import NumberContaioner from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

function GameScreen({ userNumber }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    let minBoundary = 1;
    let maxBoundary = 100;

    function nextGuessHandler(direction) { // 'lower' 'greater'
        if (
            (direction === 'lower' && currentGuess < userNumber) 
        || (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie! You know this is wrong." , [
                {text: 'Sorry', style: 'cancel'},
            ]);
            return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
    }

    return (
        <View style={styles.screen}>
            <Title> Opponent's Guess </Title>
            <NumberContaioner>{currentGuess}</NumberContaioner>
            <View>
                <Text> Higher or Lower?</Text>
                <View style={styles.buttonsContainer}>
                    {/** il metodo bind() si usa per pre-configurare una funzione */}
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                </View>
            </View>
            <View>
                <Text>LOG ROUNDS</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    buttonsContainer: {
        flexDirection: 'column'
    }
})
export default GameScreen;
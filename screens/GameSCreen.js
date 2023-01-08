import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NumberContaioner from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(
        1, 
        100, 
        userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const {width, height} = useWindowDimensions();

    useEffect( () => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect( () => {
        minBoundary = 1;
        maxBoundary = 100;
    },[]);

    function nextGuessHandler(direction) { // 'lower' 'greater'
        if (
            (direction === 'lower' && currentGuess < userNumber) 
        || (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie! You know this is wrong." , [
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
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundListLength = guessRounds.length;

    let content = (
        <>
        <NumberContaioner>{currentGuess}</NumberContaioner>
            <Card>
                <InstructionText style={styles.instructionText}> Lower or greater?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                    {/** il metodo bind() si usa per pre-configurare una funzione */}
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    if (width > 500) {
        content = (
            <>
            <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                    {/** il metodo bind() si usa per pre-configurare una funzione */}
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <NumberContaioner>{currentGuess}</NumberContaioner> 
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Title> Opponent's Guess </Title>

            {content}

            <View style={styles.listContainer}>
                { /** guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>) */}
                <FlatList data={guessRounds} 
                renderItem={(itemData)=> 
                    <GuessLogItem 
                        roundNumber={guessRoundListLength - itemData.index} 
                        guess={itemData.item}
                    />}
                keyExtractor={(item) => item}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonsContainerWide:  {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})
export default GameScreen;
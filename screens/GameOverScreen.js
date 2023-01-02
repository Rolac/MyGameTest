import { View, Image, Text, StyleSheet, Dimensions} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
   return (
    <View style={styles.rootContainer}>
        <Title> GAME OVER !</Title>
        <View style={styles.imageConteiner}>
        <Image style={ styles.image } source={require('../assets/images/success.png')}/>
        </View>
        <View>
            <Text style={styles.summaryText}>Your phone needed 
                <Text style={styles.highlight}> {roundsNumber} </Text> 
                rounds to find 
                <Text style={styles.highlight}> {userNumber} </Text> 
                number.
            </Text>
        </View>
        <PrimaryButton onPress={onStartNewGame}>Start new Game</PrimaryButton>
    </View>
   );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageConteiner: {
        borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        height: deviceWidth < 380 ? 150 : 300,
        width: deviceWidth < 380 ? 150 : 300,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        height: '100%' ,
        width: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    }
});
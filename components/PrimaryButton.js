import { View, Text, Pressable, StyleSheet } from 'react-native';

function PrimaryButton({ children }) {

    function pressHandler() {
        console.log('Pressed!');
    }

    /** Per mostrare l'effetto ripple dentro il bottone in Android bisogna mettere la View fuorio ed il Pressable dentro */
    return (
        <View style={styles.buttonOuterContainer}>
            {/** L'evento pressed è un booleano generato dall'oggetto Pressable*/}
            <Pressable
                onPress={pressHandler}
                android_ripple={{ color: '#640233' }}
                style={({pressed}) => pressed 
                ? [styles.buttonInnerContainer, styles.pressed] 
                : styles.buttonInnerContainer }>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: '#72063c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    /** Per l'effetto su iOS */
    pressed: {
        opacity: 0.75,
    }

});

export default PrimaryButton;
import { Text, StyleSheet, PLatform } from 'react-native';
import Colors from '../../constants/colors';

/*
è possibile creare componenti specifici per piattaforma semplicemente aggiungedo .ios o .android al nome del file
Per esempio per questo file si può aggiungere:
Title.ios.js
Title.android.js
per gli import però bisogna mantenere soltanto Title.js
*/
function Title({children}) {
    return   (
        <Text style={styles.title}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: 'open-sans-bold', 
        color: Colors.title,
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        borderWidth: Platform.select({ios: 0, android: 2}),
        borderColor: Colors.title,
        padding: 12,
        maxWidth: '80%',
        width: 300
    }
}) 

export default Title;
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

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
        borderWidth: 2,
        borderColor: Colors.title,
        padding: 12,
    }
}) 

export default Title;
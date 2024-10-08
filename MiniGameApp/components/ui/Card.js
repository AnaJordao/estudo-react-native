import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }){
    return (
        <View style={styles.inputContainer}>{children}</View>
    )
}

export default Card;

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 400 ? 18 : 36,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, // only in Android
        shadowColor: 'black',                   // only in IOS
        shadowOffset: {width: 0, height: 2},    // only in IOS
        shadowRadius: 6,                        // only in IOS
        shadowOpacity: 0.25                     // only in IOS
    },
})
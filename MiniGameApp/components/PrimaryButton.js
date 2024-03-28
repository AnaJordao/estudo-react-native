import { Pressable, StyleSheet, Text, View } from "react-native";

function PrimaryButton({ children, onPress }){

    return (
        <View style={styles.outerContainer}>
            <Pressable 
                style={({pressed}) => pressed ? [styles.innerContainer, styles.pressed] : styles.innerContainer} 
                onPress={onPress} 
                android_ripple={{color: '#640233'}}
            >
                <Text style={styles.text}>{ children }</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    innerContainer: {
        backgroundColor: '#72063c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }
});
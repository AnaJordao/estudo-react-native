import { ImageBackground, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import { SafeAreaView as SafeAreaViewAndroid} from 'react-native-safe-area-context';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if(userNumber){
    screen = <GameScreen />
  }

  return (
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen}>
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImg}
        >

        {Platform.OS === "android" ? (
          <SafeAreaViewAndroid style={styles.rootScreen}>
            {screen}
          </SafeAreaViewAndroid>
        ):(
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        )}

      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImg: {
    opacity: 0.15
  }
});

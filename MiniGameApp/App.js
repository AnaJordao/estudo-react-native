import { ImageBackground, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import { SafeAreaView as SafeAreaViewAndroid} from 'react-native-safe-area-context';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if(!fontsLoaded){
    return <AppLoading />;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setGameIsOver(false);
    setUserNumber(pickedNumber);
  }
  
  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if(userNumber){
    screen = <GameScreen userNumber={userNumber}  onGameOver={gameOverHandler}/>
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen 
                userNumber={userNumber} 
                roundsNumber={guessRounds} 
                onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
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
    </>
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

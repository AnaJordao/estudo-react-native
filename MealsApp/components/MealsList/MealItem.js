import { useNavigation } from "@react-navigation/native";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MealDetails from "../MealDetails";

function MealItem({title, imageUrl, duration, complexity, affordability, id}){
  const navigation = useNavigation();
  
  function navigateToDetailHandler() {
    navigation.navigate('MealDetails', {
      mealId: id
    })
  }
  return (
    <View style={styles.mealItem}>
      <Pressable onPress={navigateToDetailHandler} android_ripple={{color: '#ccc'}} style={({pressed}) => pressed ? styles.buttonPressed : null}>
        <View style={styles.innerContainer}>
          <View>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails duration={duration} affordability={affordability} complexity={complexity} />
        </View>
      </Pressable>
    </View>
  )
}

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // hide the android ripple if it goes beyond the tile, but takes the shadow off the IOS
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8
  },
  buttonPressed: {
    opacity: 0.5
},
})
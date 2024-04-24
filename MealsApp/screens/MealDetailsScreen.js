import { useContext, useLayoutEffect } from "react";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";


function MealDetailsScreen({ route, navigation }){
  const id = route.params.mealId
  const selectedMeal = MEALS.find((meal) => meal.id === id);
  
  // const favoriteMealsContext = useContext(FavoritesContext);
  // const mealsIsFavorite = favoriteMealsContext.ids.includes(id);
  
  const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  const mealsIsFavorite = favoriteMealIds.includes(id);
  
  function changefavoriteStatusHandler(){
    if(mealsIsFavorite){
      // favoriteMealsContext.removeFavorite(id);
      dispatch(removeFavorite({id: id}));
    } else {
      // favoriteMealsContext.addFavorite(id);
      dispatch(addFavorite({id: id}));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton 
                  icon={mealsIsFavorite ? 'star' : 'star-outline'} 
                  color='white' 
                  onPress={changefavoriteStatusHandler} 
                />
      }
    });
  }, [navigation, changefavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails 
        duration={selectedMeal.duration} 
        complexity={selectedMeal.complexity} 
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  )
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32
  },
  image: {
    width: '100%',
    height: 350
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white'
  },
  detailText: {
    color: 'white'
  },
  listContainer: {
    width: '80%'
  },
  listOuterContainer: {
    alignItems: 'center'
  }
})
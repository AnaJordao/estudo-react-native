import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { Image, Text, View } from "react-native";


function MealDetailsScreen({ route }){
  const id = route.params.mealId
  const selectedMeal = MEALS.find((meal) => meal.id === id);

  return (
    <View>
      <Image source={{uri: selectedMeal.imageUrl}} />
      <Text>{selectedMeal.title}</Text>
      <MealDetails duration={selectedMeal.duration} complexity={selectedMeal.complexity} affordability={selectedMeal.affordability}/>
      <Text>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <Text key={ingredient}>{ingredient}</Text>
      ))}
      <Text>Steps</Text>
      {selectedMeal.steps.map(step => (
        <Text key={step}>{step}</Text>
      ))}
    </View>
  )
}

export default MealDetailsScreen;
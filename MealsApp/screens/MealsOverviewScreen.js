import { Text, View, StyleSheet, FlatList } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

function MealsOverviewScreen({ route, navigation }){
    const catId = route.params.categoryId

    // using useLayoutEffect instead useEffect so the title doesn't delay
    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((categgory)=> categgory.id === catId).title;
        navigation.setOptions({
            title: categoryTitle
        });
    }, [catId, navigation])


    
    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });
    
    function renderMealItem(itemData){
        const item = itemData.item;
        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            complexity: item.complexity,
            affordability: item.affordability,
            duration: item.duration
        }

        
        return (
            <MealItem {...mealItemProps} />
        )
    }

    return (
        <View style={styles.container}>
            <FlatList data={displayedMeals} keyExtractor={(item) => item.id} renderItem={renderMealItem} />
        </View>
    )
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
})
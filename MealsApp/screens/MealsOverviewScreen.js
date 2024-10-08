import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

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
    
    return <MealsList items={displayedMeals} />
    
}

export default MealsOverviewScreen;


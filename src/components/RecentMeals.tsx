import { View, Text } from 'react-native';
import { globalStyles } from '@/styles/global';
import MealItem from './MealItem';
import { Meal } from '@/storage/meals';

type RecentMealProps = {
  meals: Meal[];
  onDeleted: () => void;
};

export default function RecentMeals({ meals, onDeleted }: RecentMealProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Meals</Text>
      {meals.length === 0 ? (
        <Text style={globalStyles.empty}>No Meals Logged</Text>
      ) : (
        meals
          .slice(0, 5)
          .map((meal) => (
            <MealItem key={meal.id} {...meal} onDeleted={onDeleted} />
          ))
      )}
    </View>
  );
}

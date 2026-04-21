import { Text, ScrollView, Alert, View } from 'react-native';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getMeals, Meal } from '@/storage/meals';
import MealItem from '@/components/MealItem';

export default function MealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = useCallback(async () => {
    try {
      const data = await getMeals();
      setMeals(data);
    } catch {
      Alert.alert('Error', 'Could not show all meals.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [loadMeals])
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Meals</Text>
      <View style={{ marginTop: 30 }}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem key={meal.id} {...meal} onDeleted={loadMeals} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

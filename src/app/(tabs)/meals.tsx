import {
  Text,
  ScrollView,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { clearAllMeals, getMeals, Meal } from '@/storage/meals';
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

  const handleClearAll = () => {
    Alert.alert(
      'Clear all meals?',
      'This will permanently delete every logged meal. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllMeals();
              loadMeals();
            } catch {
              Alert.alert('Error', 'Could not clear all meals.');
            }
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [loadMeals])
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
  clearButton: {
    color: colors.alert,
    fontSize: 16,
  },
});

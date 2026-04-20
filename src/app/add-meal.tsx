import { Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '@/styles/global';

export default function AddMealsScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Meal</Text>
    </View>
  );
}

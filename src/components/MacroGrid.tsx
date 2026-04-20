import { View, StyleSheet } from 'react-native';
import React from 'react';
import MacroCard from './MacroCard';

export default function MacroGrid() {
  return (
    <View style={styles.grid}>
      <MacroCard label="Calories" value="0" goal="2,000" color="#ff9f43" />
      <MacroCard label="Protein" value="0g" goal="150g" color="#ff6b6b" />
      <MacroCard label="Carbs" value="0g" goal="250g" color="#ffd93d" />
      <MacroCard label="Fat" value="0g" goal="65g" color="#a78bfa" />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});

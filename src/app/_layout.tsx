import { colors } from '@/styles/global';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: '#FFF',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'Home' }}
      />
      <Stack.Screen name="meals" options={{ title: 'Meals' }} />
      <Stack.Screen name="add-meal" options={{ title: 'Add Meal' }} />
    </Stack>
  );
}

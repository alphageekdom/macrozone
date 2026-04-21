import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { configureNotifications } from '@/utils/notifications';

export default function RootLayout() {
  useEffect(() => {
    configureNotifications();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';

const REMINDERS_KEY = 'remindersEnabled';

export const getRemindersEnabled = async (): Promise<boolean> => {
  const val = await AsyncStorage.getItem(REMINDERS_KEY);
  return val === 'true';
};

export const setRemindersEnabled = async (value: boolean): Promise<void> => {
  await AsyncStorage.setItem(REMINDERS_KEY, String(value));
};

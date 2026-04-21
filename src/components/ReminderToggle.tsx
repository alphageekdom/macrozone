import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '@/styles/global';
import {
  cancelMealReminders,
  requestPermissions,
  scheduleMealReminders,
} from '@/utils/notifications';
import {
  getRemindersEnabled,
  setRemindersEnabled,
} from '@/storage/preferences';

export default function ReminderToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    getRemindersEnabled().then(setEnabled);
  }, []);

  const toggle = async (value: boolean) => {
    try {
      if (value) {
        const granted = await requestPermissions();
        if (!granted) {
          Alert.alert(
            'Notifications disabled',
            'Enable notifications for MacroZone in Settings to receive meal reminders.'
          );
          return;
        }
        await scheduleMealReminders();
      } else {
        await cancelMealReminders();
      }
      await setRemindersEnabled(value);
      setEnabled(value);
    } catch {
      Alert.alert('Error', 'Could not update reminder settings.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meal Reminders</Text>
      <Switch
        value={enabled}
        onValueChange={toggle}
        trackColor={{ false: colors.surface, true: colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    color: colors.text,
    fontSize: 16,
  },
});

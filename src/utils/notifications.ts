import * as Notifications from 'expo-notifications';

export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

export const requestPermissions = async (): Promise<boolean> => {
  const response = await Notifications.requestPermissionsAsync();
  return (
    response.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED
  );
};

export const scheduleMealReminders = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'MacroZone',
      body: "Don't forget to log your lunch!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 12,
      minute: 0,
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'MacroZone',
      body: 'Time to log your dinner!',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
    },
  });
};

export const cancelMealReminders = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

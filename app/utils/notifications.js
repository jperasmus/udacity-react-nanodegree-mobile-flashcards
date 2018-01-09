import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { NOTIFICATIONS_KEY } from './constants';

function createNotification() {
  return {
    title: 'Time to study!',
    body: "📚 Oi! Don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export const clearLocalNotifications = async () => {
  await AsyncStorage.removeItem(NOTIFICATIONS_KEY);
  return Notifications.cancelAllScheduledNotificationsAsync();
};

export const setLocalNotification = async () => {
  const rawString = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
  const data = await JSON.parse(rawString);

  if (!data) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      await Notifications.cancelAllScheduledNotificationsAsync();

      const tomorrow = new Date();
      // Set the notification time to tomorrow so that if the user doesn't finish a quiz within exactly 24hours s/he gets reminded
      // Assuming that people are creatures of habit and they chose this particular time of the day to study, chances are that it
      // is a good time for them to study at this time.
      tomorrow.setDate(tomorrow.getDate() + 1);

      await Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: tomorrow,
        repeat: 'day'
      });

      return AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
    }
  }

  return data;
};

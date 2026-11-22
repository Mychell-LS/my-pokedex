
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/routes';
import {
  setupNotificationHandler,
} from './src/services/localNotifications';

export default function App() {
  useEffect(() => {
    setupNotificationHandler();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AppNavigator />
    </NavigationContainer>
  );
}

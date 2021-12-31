import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './routes';

export default function Navigation() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/*login new activity */}
        <Tab.Screen name={routes.HOME} component={HomeScreen} />
        <Tab.Screen name={routes.DASHBOARD} component={SettingsScreen} />
        <Tab.Screen name={routes.HISTORY} component={HomeScreen} />
        <Tab.Screen name={routes.LEADERBOARD} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

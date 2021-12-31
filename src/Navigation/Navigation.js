import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './routes';
import HomeScreen from '../Screens/HomeScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import LeaderBoardScreen from '../Screens/LeaderBoardScreen';

export default function Navigation() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/*login new activity */}
        <Tab.Screen name={routes.HOME} component={HomeScreen} />
        <Tab.Screen name={routes.DASHBOARD} component={DashboardScreen} />
        <Tab.Screen name={routes.HISTORY} component={HistoryScreen} />
        <Tab.Screen name={routes.LEADERBOARD} component={LeaderBoardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

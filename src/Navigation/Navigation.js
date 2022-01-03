import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './routes';
import TrackActivityScreen from '../Screens/TrackActivityScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import LeaderBoardScreen from '../Screens/LeaderBoardScreen';
import auth from '@react-native-firebase/auth';
import LoginStack from './stacks/LoginStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';

export default function Navigation() {
  const Tab = createBottomTabNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  if (!user) {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
          <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={routes.TRACK_ACTIVITY_SCREEN}
          component={TrackActivityScreen}
        />
        <Tab.Screen name={routes.DASHBOARD} component={DashboardScreen} />
        <Tab.Screen name={routes.HISTORY} component={HistoryScreen} />
        <Tab.Screen name={routes.LEADERBOARD} component={LeaderBoardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

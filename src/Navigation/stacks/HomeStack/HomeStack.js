import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../../Screens/LoginScreen';
import RegisterScreen from '../../../Screens/RegisterScreen';
import TrackActivityStack from '../TrackActivityStack';
import routes from '../../routes';

export default function HomeStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.TRACK_ACTIVITY_STACK}
        component={TrackActivityStack}
      />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
}

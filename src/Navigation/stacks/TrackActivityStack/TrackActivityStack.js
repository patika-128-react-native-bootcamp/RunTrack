import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewActivityScreen from '../../../Screens/NewActivityScreen';
import routes from '../../routes';
import TrackActivityScreen from '../../../Screens/TrackActivityScreen';

export default function TrackActivityStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.NEW_ACTIVITY} component={NewActivityScreen} />
      <Stack.Screen
        name={routes.TRACK_ACTIVITY_SCREEN}
        component={TrackActivityScreen}
      />
    </Stack.Navigator>
  );
}

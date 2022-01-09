import React from 'react';
import {View, Text} from 'react-native';
import WeatherComponent from '../Weather/WeatherComponent';

export default function ActivityData({distance, AvgSpeed}) {
  return (
    <View>
      <Text>{distance}</Text>
      <Text>{Math.round(AvgSpeed)}</Text>
    </View>
  );
}

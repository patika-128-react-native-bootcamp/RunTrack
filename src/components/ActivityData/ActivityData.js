import React from 'react';
import {View, Text} from 'react-native';
import WeatherComponent from '../Weather/WeatherComponent';

export default function ActivityData({distance, AvgSpeed}) {
  return (
    <View>
      <Text>Total Distance: {distance}</Text>
      <Text>Average Speed:{Math.round(AvgSpeed)}</Text>
    </View>
  );
}

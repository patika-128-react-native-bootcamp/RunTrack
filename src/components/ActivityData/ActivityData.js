import React from 'react';
import {View, Text} from 'react-native';

export default function ActivityData({distance, AvgSpeed}) {
  return (
    <View>
      <Text>{distance}</Text>
      <Text>{AvgSpeed}</Text>
    </View>
  );
}

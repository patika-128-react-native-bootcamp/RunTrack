import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';

export default function TrackActivityScreen() {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity onPress={console.log('stopped')}>
        <Text>STOP</Text>
      </TouchableOpacity>
    </View>
  );
}

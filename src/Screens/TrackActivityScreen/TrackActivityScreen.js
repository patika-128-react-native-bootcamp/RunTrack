import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function TrackActivityScreen() {
  const position1 = {coords: {latitude: 39.9334, longitude: 32.8597}};
  // const [posHistory, setPosHistory] = useState({
  //   latitude: [initialRegion.coords.latitude],
  //   longitude: [initialRegion.coords.longitude],
  // });
  const [currentPos, setCurrentPos] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setInitialRegion(info));
    Geolocation.watchPosition(info => {
      setCurrentPos(info);
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      {!!initialRegion && !!currentPos && (
        <MapView
          style={{flex: 1}}
          region={{
            latitude: currentPos.coords.latitude,
            longitude: currentPos.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          zoomControlEnabled={true}
          followsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: currentPos.coords.latitude,
              longitude: currentPos.coords.longitude,
            }}
          />
          <Marker
            coordinate={{
              latitude: initialRegion.coords.latitude,
              longitude: initialRegion.coords.longitude,
            }}
          />
        </MapView>
      )}

      {currentPos && <Text>{currentPos?.coords.latitude}</Text>}
      {currentPos && <Text>{currentPos?.coords.longitude}</Text>}

      <TouchableOpacity>
        <Text>START</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>STOP</Text>
      </TouchableOpacity>
    </View>
  );
}

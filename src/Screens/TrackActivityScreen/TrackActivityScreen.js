import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import BarChart from '../../components/BarChart';
import {useNavigation} from '@react-navigation/native';
import {Timer, Countdown} from 'react-native-element-timer';
import styles from './TrackActivity.styles';
import routes from '../../Navigation/routes';

export default function TrackActivityScreen() {
  const [initialRegion, setInitialRegion] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [posHistory, setPosHistory] = useState([]);
  const [distance, setDistance] = useState(0);
  const [chartHistory, setChartHistory] = useState([0, 0, 0, 0, 0, 0]);
  const [activity, setActivity] = useState(false);
  const [timer, setTimer] = useState(1);
  const [showShareButton, setShowShareButton] = useState(false);
  const navigation = useNavigation();

  const timerRef = useRef(null);

  useEffect(() => {
    const a = Geolocation.watchPosition(info => {
      let newArr = posHistory;

      newArr.push({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
      setPosHistory(newArr);
    });
  }, []);

  useEffect(() => {
    if (posHistory.length > 1) {
      let meter = getDistanceFromLatLonInKm(
        posHistory[posHistory.length - 1].latitude,
        posHistory[posHistory.length - 1].longitude,
        posHistory[posHistory.length - 2].latitude,
        posHistory[posHistory.length - 2].longitude,
      );
      meter = meter + distance;
      setDistance(meter);
    }
  }, [currentPos]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.floor(d * 1000);
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function handleCoordinate(e) {
    setActivity(true);
    setShowShareButton(false);
    if (!!e) {
      setTimer(e);
    }
    if (e == 1 || e % 3 == 0) {
      Geolocation.getCurrentPosition(info => setCurrentPos(info));
    }
    if (e > 0 && e < 2) {
      Geolocation.getCurrentPosition(info => setInitialRegion(info));
    }
  }

  function handleActivityEnd(e) {
    setActivity(false);
    setShowShareButton(true);
  }

  return (
    <View style={{flex: 1}}>
      <Timer
        ref={timerRef}
        style={styles.timer}
        textStyle={styles.timerText}
        onTimes={e => {
          handleCoordinate(e);
        }}
        onPause={e => {}}
        onEnd={e => {
          handleActivityEnd(e);
        }}
      />
      {!!initialRegion && !!currentPos && (
        <MapView
          style={{flex: 1}}
          region={{
            latitude: currentPos.coords.latitude,
            longitude: currentPos.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          zoomControlEnabled={true}
          showsUserLocation={true}
          loadingEnabled={true}>
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
          <Polyline
            coordinates={[
              {
                latitude: initialRegion.coords.latitude,
                longitude: initialRegion.coords.longitude,
              },
              ...posHistory,
              {
                latitude: currentPos.coords.latitude,
                longitude: currentPos.coords.longitude,
              },
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          />
        </MapView>
      )}

      {!!currentPos && <Text>Time:{timer} seconds</Text>}
      {!!currentPos && <Text>Distance: {distance} meters</Text>}
      {!!currentPos && <Text>Speed: {Math.floor(distance / timer)} m/s</Text>}
      {!!initialRegion && <BarChart history={chartHistory} />}
      {!activity && (
        <TouchableOpacity onPress={() => timerRef.current.start()}>
          <Text>START</Text>
        </TouchableOpacity>
      )}
      {!!activity && (
        <TouchableOpacity
          onPress={() => {
            timerRef.current.stop();
            setActivity(false);
          }}>
          <Text>STOP</Text>
        </TouchableOpacity>
      )}
      {!!showShareButton && (
        <TouchableOpacity>
          <Text>SHARE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

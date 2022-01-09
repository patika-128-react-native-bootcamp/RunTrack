import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import useAxios from '../../helpers/ApiHelper';
import Geolocation from '@react-native-community/geolocation';
import styles from './WeatherComponent.styles';

export default function WeatherComponent({lat, lon}) {
  const [weatherPos, setWeatherPos] = useState({lat: 32, lon: 29});
  const {data, error, isLoading} = useAxios(weatherPos);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setWeatherPos({lat: info.coords.latitude, lon: info.coords.longitude});
    });
  }, [weatherPos]);
  return (
    <>
      <View>
        {data && <Text>{Math.round(data.current.temp - 273.15)}</Text>}
      </View>
      <View>
        <Text>Weather: 15</Text>
      </View>
    </>
  );
}

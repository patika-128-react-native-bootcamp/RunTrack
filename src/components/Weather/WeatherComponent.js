import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import useAxios from '../../helpers/ApiHelper';
import Geolocation from '@react-native-community/geolocation';

export default function WeatherComponent({lat, lon}) {
  const [weatherPos, setWeatherPos] = useState({lat: 64, lon: 149});
  const {data, error, isLoading} = useAxios(weatherPos);
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setWeatherPos({lat: info.coords.latitude, lon: info.coords.longitude});
    });
  }, []);
  return (
    <View>{data && <Text>{Math.round(data.current.temp - 273.15)}</Text>}</View>
  );
}

import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default function useAxios() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setLocation(info));
    setIsLoading(true);
    async function fetchWeather() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=minutely,
            hourly,
            daily,
            alerts&appid=22ba6a983a400f6fd7a05c3ddb7d3fe1`,
        );
        setError(null);
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setData(null);
        setError(err);
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return {data, error, isLoading};
}

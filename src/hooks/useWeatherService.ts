import { useEffect, useState } from 'react';
import { IWeather } from '../models/IWeather';

const useWeatherService = (city: string) => {
  const latitude = '41.15';
  const longitude = '-8.6';
  const url = `https://api.open-meteo.com/v1/ecmwf?latitude=${latitude}&longitude=${longitude}1&hourly=temperature_2m,weathercode,precipitation,snowfall,runoff,windspeed_10m,winddirection_10m,skin_temperature,soil_temperature_0_to_7cm&past_days=1`;
  const [data, setData] = useState({} as IWeather);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setData({} as IWeather);
        setError('error found');
      }
    })();
  }, [url]);
  return { data, loading, error };
};

export default useWeatherService;

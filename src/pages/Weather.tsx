import useWeatherService from '../hooks/useWeatherService';

const Weather = () => {
  const { data, loading, error } = useWeatherService('Porto');

  console.log('weather data', data);

  return <h1>weather page</h1>;
};

export default Weather;

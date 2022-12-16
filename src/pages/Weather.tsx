import useWeatherService from '../hooks/useWeatherService';

import CanvasJSReact from '../assets/canvasjs.react';

const Weather = () => {
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const { data, loading, error } = useWeatherService('Porto');

  const options = {
    title: {
      text: 'Basic Column Chart in React',
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: 'Apple', y: 10 },
          { label: 'Orange', y: 15 },
          { label: 'Banana', y: 25 },
          { label: 'Mango', y: 30 },
          { label: 'Grape', y: 28 },
        ],
      },
    ],
  };

  console.log('weather data', data);

  return <CanvasJSChart options={options} />;
};

export default Weather;

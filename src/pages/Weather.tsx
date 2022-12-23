import { Select, Table } from "antd";
import styles from "./Weather.module.css";
import useWeatherService from "../hooks/useWeatherService";
import cities from "../util/cities";
import { useState } from "react";
import weather from "../util/weather";

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState("Porto");
  const { data, loading, error } = useWeatherService(selectedCity);

  const items = cities.map((city) => {
    return {
      label: city.name,
      value: city.name,
    };
  });
  const onChange = (value: string) => {
    const city = cities.find((city) => city.name === value);
    console.log("city 2", city);
    setSelectedCity(value);
  };

  const weatherValues = data.hourly?.time.map((date, index) => {
    return {
      key: index,
      date,
      temperature: data.hourly.temperature_2m[index],
      precipitation: data.hourly.precipitation[index],
      weather: data.hourly.weathercode[index],
    };
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value: string) => {
        const date = new Date(value);
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        return date.toLocaleString("en-GB", options);
      },
    },
    {
      title: `Temperature ${data.hourly_units?.temperature_2m}`,
      dataIndex: "temperature",
      key: "temperature",
    },
    {
      title: `Precipitation ${data.hourly_units?.precipitation}`,
      dataIndex: "precipitation",
      key: "precipitation",
    },
    {
      title: "Weather",
      dataIndex: "weather",
      key: "weather",
      render: (value: number) => weather[value] ?? "--",
    },
  ];

  return (
    <div className={styles.container}>
      <Table dataSource={weatherValues} columns={columns} pagination={{pageSize: 8, showSizeChanger: false}} size="small" />
      <div className={styles.sideActions}>
        <Select
          showSearch
          placeholder="City"
          defaultValue={
            cities.find(
              (city) => city.name.toLowerCase() === selectedCity.toLowerCase()
            )?.name
          }
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={items}
          style={{ width: 150 }}
        />
      </div>
    </div>
  );
};

export default Weather;

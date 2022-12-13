export interface IWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
  precipitation: number[];
  cloudcover: number[];
  skin_temperature: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  weathercode: string;
  precipitation: string;
  cloudcover: string;
  skin_temperature: string;
}

import { WeatherCondition } from "./WeatherCondition";

export interface CurrentWeather {
    tempC: number;
    windKph: number;
    humidity: number;
    condition: WeatherCondition;
  }
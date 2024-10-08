import { WeatherCondition } from "./WeatherCondition";

export interface DayForecast {
    maxTempC: number;
    minTempC: number;
    avgTempC: number;
    condition: WeatherCondition;
  }
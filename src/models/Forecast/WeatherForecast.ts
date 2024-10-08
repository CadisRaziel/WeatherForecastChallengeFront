import { CurrentWeather } from "./CurrentWeather";
import { LocationApi } from "./LocationApi";

export interface WeatherForecast {
    location: LocationApi;
    current: CurrentWeather;
  }
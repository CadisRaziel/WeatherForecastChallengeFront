import { ForecastDay } from "./ForecastDay";
import { LocationApi } from "./LocationApi";

export interface WeatherForecastWithMultipleDays {
    location: LocationApi;
    forecast: {
      forecastDay: ForecastDay[];
    };
  }
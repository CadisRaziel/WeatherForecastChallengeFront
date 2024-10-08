import { useState } from "react";
import { WeatherForecastWithMultipleDays } from "../../models/Forecast/WeatherForecastWithMultipleDays";
import { fetchWeatherForecastFiveDays } from "../../services/http_client/Forecast/weatherForecast_five_days";
import { UseAuth } from "../../services/context/auth";

export const useWeatherForecastControllerFiveDays = () => {    
    const [weatherDataFiveDays, setWeatherDataFiveDays] = useState<WeatherForecastWithMultipleDays | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const userData = UseAuth();

    const getWeatherForecastFiveDays = async (city: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchWeatherForecastFiveDays(city, userData.authResponse?.accessToken!);
            setWeatherDataFiveDays(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Um erro desconhecido ocorreu.');
        } finally {
            setLoading(false);
        }
    };

    return {
        weatherDataFiveDays,
        loading,
        error,
        getWeatherForecastFiveDays,
    };
};

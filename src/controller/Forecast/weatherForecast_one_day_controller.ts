import { useState } from "react";
import { WeatherForecast } from "../../models/Forecast/WeatherForecast";
import { fetchWeatherForecast } from "../../services/http_client/Forecast/weatherForecast_one_day";
import { UseAuth } from "../../services/context/auth";

export const useWeatherForecastController = () => {
    const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const userData = UseAuth();

    const getWeatherForecast = async (city: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchWeatherForecast(city, userData.authResponse?.accessToken!);
            setWeatherData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Um erro desconhecido ocorreu.');
        } finally {
            setLoading(false);
        }
    };

    return {
        weatherData,
        loading,
        error,
        getWeatherForecast,
    };
};

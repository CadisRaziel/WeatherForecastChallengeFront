import { WeatherForecastWithMultipleDays } from "../../../models/Forecast/WeatherForecastWithMultipleDays";

const API_URL = 'https://localhost:7226/api/WeatherForecast/fivedays';

export const fetchWeatherForecastFiveDays = async (city: string, token: string): Promise<WeatherForecastWithMultipleDays> => {
    const headers: HeadersInit = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${API_URL}/${city}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error('Não foi possível obter a previsão para 5 dias');
    }

    const data = await response.json();
    return data as WeatherForecastWithMultipleDays; 
};

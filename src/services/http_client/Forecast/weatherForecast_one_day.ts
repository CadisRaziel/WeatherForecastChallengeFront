const API_URL = 'https://localhost:7226/api/WeatherForecast';

export const fetchWeatherForecast = async (city: string, token: string) => {
    const headers: HeadersInit = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${API_URL}/${city}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error('Não foi possível obter a previsão');
    }

    const data = await response.json();
    return data;
};

import React, { useState } from 'react';
import { useWeatherForecastController } from '../../controller/Forecast/weatherForecast_one_day_controller';
import { useWeatherForecastControllerFiveDays } from '../../controller/Forecast/weatherForecast_five_days_controller';
import { format } from 'date-fns/format';

export default function Dashboard() {
    const [city, setCity] = useState<string>('');
    const [forecastType, setForecastType] = useState<'oneDay' | 'fiveDays'>('oneDay');

    
    const { weatherData, loading, error, getWeatherForecast } = useWeatherForecastController();
    const { weatherDataFiveDays, loading: loadingFiveDays, error: errorFiveDays, getWeatherForecastFiveDays } = useWeatherForecastControllerFiveDays();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (city) {
            if (forecastType === 'oneDay') {
                await getWeatherForecast(city); 
            } else {
                await getWeatherForecastFiveDays(city); 
            }
        }
    };

    const handleForecastTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForecastType(event.target.value as 'oneDay' | 'fiveDays');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Previsão do tempo</h1>
            <form onSubmit={handleSubmit} className="mb-4 flex items-center">
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Digite a cidade"
                    className="border border-gray-300 rounded-md p-2"
                    required
                />

                <div className="ml-2">
                    <label>
                        <input
                            type="radio"
                            value="oneDay"
                            checked={forecastType === 'oneDay'}
                            onChange={handleForecastTypeChange}
                            className="mr-1"
                        />
                        1 Dia
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            value="fiveDays"
                            checked={forecastType === 'fiveDays'}
                            onChange={handleForecastTypeChange}
                            className="mr-1"
                        />
                        5 Dias
                    </label>
                </div>

                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                    Buscar
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {loadingFiveDays && <p>Loading waiting...</p>}
            {errorFiveDays && <p className="text-red-500">{errorFiveDays}</p>}
            
            {weatherData && forecastType === 'oneDay' && (
                <div className="mt-4">
                    <h2 className="text-2xl">{weatherData.location.name}</h2>
                    <p>Temperatura: {weatherData.current.tempC}°C</p>
                    <p>Velocidade do vento: {weatherData.current.windKph} km/h</p>
                    <p>Humidade: {weatherData.current.humidity}%</p>
                    <p>Condição: {weatherData.current.condition.text}</p>
                    <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                </div>
            )}

            {weatherDataFiveDays && forecastType === 'fiveDays' && (
                <div className="mt-4">
                    <h2 className="text-2xl">{weatherDataFiveDays.location.name}</h2>
                    <p>{weatherDataFiveDays.location.region}, {weatherDataFiveDays.location.country}</p>                   
                    <div className="flex space-x-4 mt-4 overflow-x-auto">
                        {weatherDataFiveDays.forecast.forecastDay.map((day: any, index: number) => (
                            <div key={index} className="p-4 border rounded-lg flex-shrink-0">
                                <p className="text-lg font-semibold">{format(new Date(day.date), 'dd/MM/yyyy')}</p>
                                <p>Temperatura máxima: {day.day.maxTempC}°C</p>
                                <p>Temperatura mínima: {day.day.minTempC}°C</p>
                                <p>Temperatura média: {day.day.avgTempC}°C</p>
                                <p>Condição: {day.day.condition.text}</p>
                                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

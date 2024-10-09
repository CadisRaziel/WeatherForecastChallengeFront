import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'; 
import { useWeatherForecastController } from '../../controller/Forecast/weatherForecast_one_day_controller';
import { useWeatherForecastControllerFiveDays } from '../../controller/Forecast/weatherForecast_five_days_controller';
import { format } from 'date-fns/format';
import { addFavoriteCitiesController } from '../../controller/FavoriteCities/add_favorite_cities_controller';
import { useFavoriteCitiesController } from '../../controller/FavoriteCities/list_favorite_cities_controller';
import { useAlert } from '../../components/alert';
import { AiFillDelete } from 'react-icons/ai';
import { parseISO } from 'date-fns/parseISO';
import { Card } from '../../components/card';

export default function Dashboard() {
    const [city, setCity] = useState<string>('');
    const [forecastType, setForecastType] = useState<'oneDay' | 'fiveDays'>('oneDay');

    const { weatherData, loading, error, getWeatherForecast } = useWeatherForecastController();
    const { weatherDataFiveDays, loading: loadingFiveDays, error: errorFiveDays, getWeatherForecastFiveDays } = useWeatherForecastControllerFiveDays();
    const { addCityToFavorites, loading: addingFavorite, error: favoriteError } = addFavoriteCitiesController();
    const { loading: loadingFavorites, error: errorFavorites, favoriteCities, fetchFavoriteCities, removeCityFromFavorites } = useFavoriteCitiesController();
    const { showAlert } = useAlert();

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

    const handleFavoriteClick = async () => {
        if (city) {
            await addCityToFavorites(city);
            await fetchFavoriteCities();
            showAlert(['Cidade adicionada com sucesso!'], 'success');
            setCity('');
        }
    };

    const handleRemoveFavorite = async (cityName: string) => {
        await removeCityFromFavorites(cityName);
        await fetchFavoriteCities();
        showAlert(['Cidade removida com sucesso!'], 'success');
    };

    return (
        <div className="flex flex-row items-start justify-center min-h-screen ">
            <div className="flex flex-col items-center justify-center w-3/4 ml-32 mr-32">
                <h1 className="text-4xl font-bold mb-4 mt-20">Previsão do tempo</h1>
                <div className="flex w-full justify-between">

                    <div>
                        <form onSubmit={handleSubmit} >
                            <GooglePlacesAutocomplete
                                apiKey="AIzaSyCaOIpXR8urLwxDHFt2oGdZ4zk8yrmhKMc"
                                selectProps={{
                                    value: city ? { label: city, value: city } : null,
                                    onChange: (value) => {                                        
                                        const rawCity = value?.label || '';
                                        const normalizedCity = rawCity.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
                                        const cityName = normalizedCity.split(',')[0].trim() || '';
                                        setCity(cityName);
                                    },
                                    placeholder: "Digite a cidade",
                                    className: "rounded-md w-96",
                                    required: true,
                                }}
                            />
                            <div className="mt-2 flex items-center">
                                <label className="flex items-center mr-4 whitespace-nowrap">
                                    <input
                                        type="radio"
                                        value="oneDay"
                                        checked={forecastType === 'oneDay'}
                                        onChange={handleForecastTypeChange}
                                        className="mr-1"
                                    />
                                    1 Dia
                                </label>
                                <label className="flex items-center whitespace-nowrap">
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

                            <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">
                                Buscar
                            </button>
                            {city && (
                                <button
                                    onClick={handleFavoriteClick}
                                    className="ml-2 p-2 bg-black text-white rounded-md min-w-[200px]"
                                    disabled={addingFavorite || !city}
                                >
                                    {addingFavorite ? 'Adicionando...' : 'Adicionar aos Favoritos'}
                                </button>
                            )}
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {loadingFiveDays && <p>Loading...</p>}
                        {errorFiveDays && <p className="text-red-500">{errorFiveDays}</p>}
                        {favoriteError && <p className="text-red-500">{favoriteError}</p>}

                        {weatherData && forecastType === 'oneDay' && (
                      <Card className="mt-4 relative">
                      <img 
                          src={weatherData.current.condition.icon} 
                          alt={weatherData.current.condition.text} 
                          className="w-20 h-20 absolute top-0 right-4" 
                      />
                      <h2 className="text-2xl">{weatherData.location.name}</h2>
                      <p>Temperatura: {weatherData.current.tempC}°C</p>
                      <p>Velocidade do vento: {weatherData.current.windKph} km/h</p>
                      <p>Humidade: {weatherData.current.humidity}%</p>
                      <p>Condição: {weatherData.current.condition.text}</p>
                  </Card>
                  
                        )}

                        {weatherDataFiveDays && forecastType === 'fiveDays' && (
                            <div className="mt-4">
                                <h2 className="text-2xl">{weatherDataFiveDays.location.name}</h2>
                                <p>{weatherDataFiveDays.location.region}, {weatherDataFiveDays.location.country}</p>
                                <div className="flex space-x-4 mt-4 overflow-x-auto">
                                    {weatherDataFiveDays.forecast.forecastDay.map((day: any, index: number) => (
                                        
                                        <div key={index} className="p-4 border rounded-lg flex-shrink-0">
                                             <p className="text-lg font-semibold">{format(parseISO(day.date), 'dd/MM/yyyy')}</p>
                                             
                                            <p>Temperatura máxima: {day.day.maxTempC}°C</p>
                                            <p>Temperatura mínima: {day.day.minTempC}°C</p>
                                            <p>Condição: {day.day.condition.text}</p>
                                            <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md ml-4">
                        <h2 className="text-xl font-bold mb-4">Cidades Favoritas</h2>

                        {loadingFavorites ? (
                            <p>Carregando...</p>
                        ) : errorFavorites ? (
                            <p className="text-red-500">{errorFavorites}</p>
                        ) : favoriteCities.length === 0 ? (
                            <p>Não existem cidades ainda</p>
                        ) : (
                            <ul>
                                {favoriteCities.map((city, index) => (
                                    <li key={index} className="border-b p-2 flex justify-between items-center">
                                        {city}
                                        <AiFillDelete
                                            onClick={() => handleRemoveFavorite(city)}
                                            className="text-red-500 cursor-pointer ml-2"
                                            title="Remover cidade favorita"
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

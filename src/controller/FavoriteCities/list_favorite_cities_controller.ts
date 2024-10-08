import { useState, useEffect } from "react";
import { UseAuth } from "../../services/context/auth";
import { getFavoriteCities } from "../../services/http_client/Favorite/favorite_cities_list";
import { removeFavoriteCity } from "../../services/http_client/Favorite/favorite_remove_citie";

export const useFavoriteCitiesController = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
    const userData = UseAuth();
    
    
    const fetchFavoriteCities = async () => {
        setLoading(true);
        setError(null);

        try {
            const cities = await getFavoriteCities(userData.authResponse?.accessToken!);
            setFavoriteCities(cities);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao recuperar as cidades favoritas.');
        } finally {
            setLoading(false);
        }
    };

    
    const removeCityFromFavorites = async (cityName: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await removeFavoriteCity(
                cityName,
                userData.authResponse?.accessToken!
            );
            setFavoriteCities((prevCities) => prevCities.filter(city => city !== cityName));
            return data.message; 
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao remover a cidade favorita.');
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchFavoriteCities();
    }, []);

    return {
        loading,
        error,
        favoriteCities,
        fetchFavoriteCities,
        removeCityFromFavorites,
    };
};

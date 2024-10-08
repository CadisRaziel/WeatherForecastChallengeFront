import { useState } from "react";
import { UseAuth } from "../../services/context/auth";
import { removeFavoriteCity } from "../../services/http_client/Favorite/favorite_remove_citie";

export const RemoveFavoriteCitiesController = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [favoriteCities, setFavoriteCities] = useState<string[]>([]); 
    const userData = UseAuth();

    const removeCityFromFavorites = async (cityName: string) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const data = await removeFavoriteCity(
                cityName,
                userData.authResponse?.accessToken!
            );
            setMessage(data.message);
            
            setFavoriteCities((prevCities) => prevCities.filter(city => city !== cityName));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao remover a cidade favorita.');
        } finally {
            setLoading(false);
        }
    };

    console.log("passou por aqui no controller de remover uma cidade dos favoritos");

    return {
        loading,
        error,
        message,
        favoriteCities, 
        removeCityFromFavorites,
        setFavoriteCities, 
    };
};

import { useState } from "react";
import { UseAuth } from "../../services/context/auth";
import { addFavoriteCity } from "../../services/http_client/Favorite/favorite_cities";

export const addFavoriteCitiesController = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const userData = UseAuth();

    const addCityToFavorites = async (cityName: string) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {           
            const data = await addFavoriteCity(
                cityName,
                userData.authResponse?.accessToken! 
            );
            setMessage(data.message); 
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao adicionar a cidade favorita.');
        } finally {
            setLoading(false);
        }
    };

    console.log("passou por aqui no controller de adicionar uma cidade ao favorito");

    return {
        loading,
        error,
        message,
        addCityToFavorites,
    };
};

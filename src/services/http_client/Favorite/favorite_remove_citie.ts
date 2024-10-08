const API_URL = 'https://localhost:7226/api/FavoriteCity/RemoveFavoriteCities/';

export const removeFavoriteCity = async (cityName: string, token: string) => {
    const headers: HeadersInit = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    };
    
    const url = `${API_URL}${encodeURIComponent(cityName)}`;

    console.log("URL:", url);

    const response = await fetch(url, {
        method: 'DELETE',
        headers,
    });

    console.log(response);

    if (!response.ok) {
        console.log("caiu no erro");
        throw new Error('Não foi possível remover a cidade dos favoritos.');
    }

    const data = await response.json();
    console.log("data:", data);
    return data;
};

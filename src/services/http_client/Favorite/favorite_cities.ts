const API_URL = 'https://localhost:7226/api/FavoriteCity/AddFavoriteCitie';

export const addFavoriteCity = async (cityName: string, token: string) => {
    const headers: HeadersInit = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    };
    
    const body = JSON.stringify(cityName); 

    console.log("body");
    console.log(body);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body,
    });

    console.log(response);

    if (!response.ok) {
        console.log("caiu no erro");
        throw new Error('Não foi possível salvar a cidade aos favoritos.');
    }

    const data = await response.json();
    console.log("data");
    console.log(data);
    return data;
};

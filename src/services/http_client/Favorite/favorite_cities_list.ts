const API_URL = 'https://localhost:7226/api/FavoriteCity/List';

export const getFavoriteCities = async (token: string) => {
    const headers: HeadersInit = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    };

    const response = await fetch(API_URL, {
        method: 'GET',
        headers,
    });

    console.log(response);

    if (!response.ok) {
        console.log("caiu no erro");
        throw new Error('Não foi possível recuperar as cidades favoritas.');
    }

    const data = await response.json();   
    const cities = data.map((item: { cityName: string }) => item.cityName);
    console.log("cities");
    console.log(cities);
    return cities;
};

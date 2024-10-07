import { AuthResponse } from '../../models/AuthResponse';

const API_URL = 'https://localhost:7226/api/Auth';

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    console.log("antes do response");
    const response = await fetch(`${API_URL}/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    console.log(response);

    if (!response.ok) {
        console.log("Deu errado");
        throw new Error('Failed to register user');
    }
    console.log("Deu certo");
    return response.json();
};

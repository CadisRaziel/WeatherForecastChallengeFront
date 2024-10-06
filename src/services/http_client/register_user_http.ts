import { AuthResponse } from '../../models/AuthResponse';

const API_URL = 'https://localhost:7226/api/Auth';

export const registerUser = async (email: string, password: string, confirmPassword: string): Promise<AuthResponse> => {
    console.log("antes do response");
    const response = await fetch(`${API_URL}/Register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
    });

    console.log(response);

    if (!response.ok) {
        console.log("Deu errado");
        throw new Error('Failed to register user');
    }
    console.log("Deu certo");
    return response.json();
};

import { AuthResponse } from "../../../models/User/AuthResponse";


const API_URL = 'https://localhost:7226/api/Auth';

export const registerUser = async (email: string, password: string, confirmPassword: string): Promise<AuthResponse> => {

    const response = await fetch(`${API_URL}/Register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
    });

    if (!response.ok) {
        console.log("Deu errado");
        throw new Error('Falha no registro do usuario');
    }

    return response.json();
};

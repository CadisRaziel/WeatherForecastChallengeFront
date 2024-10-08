import { AuthResponse } from "../../../models/User/AuthResponse";

const API_URL = 'https://localhost:7226/api/Auth';

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {    
    const response = await fetch(`${API_URL}/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {        
        throw new Error('Falha no login do usuario');
    }    
    return response.json();
};

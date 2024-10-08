import { useState } from 'react';
import { registerUser } from '../../services/http_client/User/register_user_http';
import { AuthResponse } from '../../models/User/AuthResponse';

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const register = async (email: string, password: string, confirmPassword: string) => {
        setLoading(true);
        setError(null);
        try {
            const response: AuthResponse = await registerUser(email, password, confirmPassword);           
            console.log(response)
            return response;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Um erro desconhecido ocorreu."); 
            }
        } finally {
            setLoading(false);
        }
    };

    return { register, error, loading };
};

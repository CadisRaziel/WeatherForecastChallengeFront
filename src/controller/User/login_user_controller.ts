import { useState } from 'react';
import { loginUser } from '../../services/http_client/User/login_user_http';
import { AuthResponse } from '../../models/User/AuthResponse';

export const userLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response: AuthResponse = await loginUser(email, password);           
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

    return { login, error, loading };
};

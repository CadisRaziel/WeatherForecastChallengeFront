import { useState } from 'react';
import { MdVisibility, MdOutlineMail, MdVisibilityOff } from 'react-icons/md';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { userLogin } from '../../controller/User/login_user_controller';
import { UseAuth } from '../../services/context/auth';


const registerSchema = z.object({
    email: z.string().email({message: "Email ou Senha inválido"}),
    password: z.string().min(6, {message:"Email ou Senha inválido"}),
    
});

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const {error, loading } = userLogin();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
	const auth = UseAuth();

    const handleSubmit = async () => {
       // e.preventDefault();        
        
        const result = registerSchema.safeParse({ email, password });
        console.log(result);
        setErrorMessage(result.error?.message!)
        console.log(result.error?.message!)
        if (!result.success) {           
           // alert(result.error.errors.map(err => err.message).join(", "));
            return;
        }
        try {
            console.log("Tentando");
            await auth.loginUser(email, password);
            // alert('Registro realizado com sucesso!');
            navigate('/dashboard'); 
        } catch (err) {           
            console.log("Deu errado");
            setErrorMessage( err instanceof Error ? err.message : 'Erro ao registrar' )   ;        
            console.log(errorMessage)
        }
    };   

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="col-span-6 items-center justify-center">
                <div className="flex flex-col items-center">
                    <img src="src/assets/forecast_icon.png" alt="Forecast Icon" className="w-24 h-24 mb-4" />
                    <h1 className="text-2xl font-bold mb-8">WeatherForecastChallengeFront</h1>
                </div>
                <form
                    className="mx-6 flex w-full flex-col gap-7 sm:mx-16 lg:mx-20"
                    onSubmit={handleSubmit}
                >                  
                    <Input
                        isRequired={true}
                        label="E-mail"
                        maxLength={120}
                        placeholder="Digite seu e-mail"
                        icon={<MdOutlineMail className="mr-4 fill-gray-400 text-2xl" />}
                        isEmail={true}
                        value={email}
                        setValue={setEmail}
                        errorMessage={"oaisdoisa"}                        
                        
                    />                   

                    <Input
                        isRequired={true}
                        label="Senha"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        icon={
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <MdVisibility className="fill-gray-400 text-2xl" />
                                ) : (
                                    <MdVisibilityOff className="fill-gray-400 text-2xl" />
                                )}
                            </button>
                        }
                        value={password}
                        setValue={setPassword}
                        errorMessage={errorMessage}
                    />                    
                    <div className="flex justify-end items-end mr-2">
                        <Link to="/register">
                            <h6>Nao possui uma conta? Registre-se!</h6>
                        </Link>
                    </div>
                    <Button onClick={handleSubmit}  disabled={loading}>{loading ? 'Carregando...' : 'Registrar'}</Button>                    
                    {error && <div className="text-red-500">{error}</div>}
                </form>
            </Card>
        </div>
    );
}

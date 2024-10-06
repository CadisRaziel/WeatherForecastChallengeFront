import { useState } from 'react';
import { MdVisibility, MdOutlineMail, MdVisibilityOff } from 'react-icons/md';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../controller/register_user_controller';
import { z } from 'zod';


const registerSchema = z.object({
    email: z.string().email({message: "Email inválido"}),
    password: z.string().min(6, {message:"A senha deve ter pelo menos 6 caracteres"}),
    confirmPassword: z.string().min(6, {message: "A confirmação da senha deve ter pelo menos 6 caracteres"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
});

export default function RegisterNewAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Novo estado para confirmar a senha
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register, error, loading } = useRegister();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
       // e.preventDefault();        
        
        const result = registerSchema.safeParse({ email, password, confirmPassword });
        console.log(result);
        setErrorMessage(result.error?.message!)
        console.log(result.error?.message!)
        if (!result.success) {           
           // alert(result.error.errors.map(err => err.message).join(", "));
            return;
        }

        try {
            console.log("Tentando");
            await register(email, password, confirmPassword);
            // alert('Registro realizado com sucesso!');
            navigate('/'); 
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
                    <Input
                        isRequired={true}
                        label="Confirme a senha"
                        type={showConfirmPassword ? 'text' : 'password'} // Alterado para usar o novo estado
                        placeholder="Confirme sua senha"
                        icon={
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? (
                                    <MdVisibility className="fill-gray-400 text-2xl" />
                                ) : (
                                    <MdVisibilityOff className="fill-gray-400 text-2xl" />
                                )}
                            </button>
                        }
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        errorMessage={errorMessage}
                    />
                    <div className="flex justify-end items-end mr-2">
                        <Link to="/">
                            <h6>Já tem uma conta? Faça o login!</h6>
                        </Link>
                    </div>
                    <Button onClick={handleSubmit}  disabled={loading}>{loading ? 'Carregando...' : 'Registrar'}</Button>                    
                    {error && <div className="text-red-500">{error}</div>}
                </form>
            </Card>
        </div>
    );
}

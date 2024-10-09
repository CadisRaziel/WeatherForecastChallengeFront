import { useState } from 'react';
import { MdVisibility, MdOutlineMail, MdVisibilityOff } from 'react-icons/md';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../controller/User/register_user_controller';
import { z } from 'zod';
import { useAlert } from '../../components/alert';

const registerSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres com 1 caracter maiúsculo, letras e números" })
        .regex(/[A-Z]/, { message: "A senha deve conter pelo menos 1 caracter maiúsculo" })
        .regex(/[0-9]/, { message: "A senha deve conter pelo menos 1 número" })
        .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos 1 caracter especial" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
});



export default function RegisterNewAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register, error, loading } = useRegister();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const result = registerSchema.safeParse({ email, password, confirmPassword });
        if (!result.success) {

            showAlert(result.error.errors.map(err => err.message), 'error');
            return;
        }

        try {
            await register(email, password, confirmPassword);

            showAlert(['Registro realizado com sucesso!'], 'success');
            navigate('/');
        } catch (err) {

            showAlert([err instanceof Error ? err.message : 'Erro ao registrar'], 'error');
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
                    />
                    <Input
                        isRequired={true}
                        label="Confirme a senha"
                        type={showConfirmPassword ? 'text' : 'password'}
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
                    />
                    <div className="flex justify-end items-end mr-2">
                        <Link to="/">
                            <h6>Já tem uma conta? Faça o login!</h6>
                        </Link>
                    </div>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Carregando...' : 'Registrar'}
                    </Button>
                    {error && <div className="text-red-500">{error}</div>}
                </form>
            </Card>
        </div>
    );
}

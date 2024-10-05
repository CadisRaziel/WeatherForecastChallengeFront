import { useState } from 'react';
import { MdVisibility, MdOutlineMail, MdVisibilityOff } from 'react-icons/md';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Link } from 'react-router-dom';

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => setShowPassword(!showPassword);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="col-span-6 items-center justify-center">
				<div className="flex flex-col items-center">
					<img src="src/assets/forecast_icon.png" alt="Forecast Icon" className="w-24 h-24 mb-4" />
					<h1 className="text-2xl font-bold mb-8">WeatherForecastChallengeFront</h1>
				</div>
				<form
					className="mx-6 flex w-full flex-col gap-7 sm:mx-16 lg:mx-20"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<Input
						isRequired={true}
						label="E-mail"
						maxLength={120}
						placeholder="Digite seu e-mail"
						icon={<MdOutlineMail className="mr-4 fill-gray-400 text-2xl" />}
						isEmail={true}
						value={''}
						setValue={() => { }}
					/>

					<Input
						isRequired={true}
						label="Senha"
						type={showPassword ? 'text' : 'password'}
						placeholder="Digite sua senha"
						icon={
							<button type="button" onClick={toggleShowPassword}>
								{showPassword ? (
									<MdVisibility className="fill-gray-400 text-2xl" />
								) : (
									<MdVisibilityOff className="fill-gray-400 text-2xl" />
								)}
							</button>
						}
						value={''}
						setValue={() => { }}
					/>

					<div className="flex justify-end items-end mr-2">
						<Link to="/register">
							<h6>Criar conta</h6>
						</Link>
					</div>
					<Button>Entrar</Button>
				</form>
			</Card>
		</div>

	);
}

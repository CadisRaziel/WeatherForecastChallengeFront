import { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse } from "../../models/AuthResponse";
import { getAuthData } from "../core/auth_core";
import { userLogin } from '../../controller/login_user_controller';
import { Loading } from "../../components/loading";


const rawAuthResponse = localStorage.getItem('UserAuthData');

type AuthContext = {
	authResponse: AuthResponse | null | undefined;
	loginUser(email: string, password: string): Promise<void>;
	logoutUser(): void;
	//signInRefresh(): Promise<void>;
};

const AuthContext = createContext<AuthContext>({
	authResponse: null,
	loginUser: async () => { },
	logoutUser: () => { },
	//signInRefresh: async () => { },
});

export function AuthProvider(params: { children: React.ReactNode }) {
	const {login} = userLogin();
	const [authResponse, _setauthResponse] = useState<AuthResponse | null | undefined>(
		rawAuthResponse ? undefined : null
	);

	useEffect(() => {
		if (authResponse === undefined && rawAuthResponse) {
			_setauthResponse(getAuthData());
		}
	}, [authResponse]);

	function setAuthData(authResponse: AuthResponse | null) {
		if (authResponse) {
			localStorage.setItem('UserAuthData', JSON.stringify(authResponse));			
			_setauthResponse(authResponse);
		} else {
			localStorage.removeItem('UserAuthData');
			_setauthResponse(null);
		}
	}

	async function loginUser(email: string, password: string): Promise<void> {
		let response:AuthResponse | undefined = await login(email, password);			
		if(response == undefined) {
			throw("Ocorreu um erro ao pegar dados do usuario e salvar");
		}	
		setAuthData(response);
	}

	// async function signInRefresh(): Promise<void> {
	//verificar se existe o token salvo no localstorage e se o expireToken tiver ativo
	//se nao tiver faco uma nova requisicao de um token atualizado, utilizando o token antigo com alguma chave por exemplo
	// 	const refreshToken = getAuthData();						
	// 	setAuthData(data);
	// }

	async function logoutUser() {
		localStorage.removeItem('UserAuthData');	
		_setauthResponse(null);
	}


	return (
		<AuthContext.Provider
			value={{ authResponse, loginUser, logoutUser}}
		>
			{authResponse !== undefined ? (
				params.children
			) : (
				<div className="flex h-screen items-center justify-center ">
					<Loading />
				</div>
			)}
		</AuthContext.Provider>
	);
}

export function UseAuth(): AuthContext {
	return useContext(AuthContext);
}
import { AuthResponse } from "../../models/User/AuthResponse";

export function getAuthData() {
	let authData: AuthResponse = getUserAuthData();	
	return authData;
}

export function getUserAuthData() {
	return JSON.parse(localStorage.getItem("UserAuthData") || "{}");
}


//refresh
// export function getAuthData() {
// 	let authData: AuthResponse = getUserAuthData();	
// 	return authData;
// }

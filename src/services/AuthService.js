import axios from "../config/http-client";
import { authHeader } from "../utils/helpers";

export class AuthService {
	static async login(credentials) {
		const { data } = await axios.post("/auth/sign-in", credentials);
		return data?.data;
	}
	static async register(userInput) {
		const { data } = await axios.post("/auth/sign-up", userInput);
		return data?.data;
	}
	static async logout(userToken) {
		const { data } = await axios.post(
			"/auth/logout",
			{},
			authHeader(userToken)
		);
		return data?.data;
	}
	static async refreshToken() {
		const { data } = await axios.post("/auth/refresh-token", {});
		return data?.data;
	}
}

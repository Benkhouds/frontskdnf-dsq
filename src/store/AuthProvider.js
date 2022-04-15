import {
	createContext,
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import { AuthService } from '../services/AuthService';
import { calculateDelayFromJwt } from '../utils/helpers';

let AuthContext = createContext(null);

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [isTokenRefreshing, setIsTokenRefreshing] = useState(true);

	const refreshInterval = useRef();
	const abortController = useRef(new AbortController());
	const isMounted = useRef(false);

	const getRefreshToken = useCallback(async () => {
		console.log('getting refresh token');
		try {
			const { accessToken: token, user: userData } =
				await AuthService.refreshToken();
			if (!!token) {
				setAccessToken(token);
				setUser(userData);
			}
		} finally {
			setIsTokenRefreshing(false);
		}
	}, []);

	useEffect(() => {
		const currentAbortController = abortController.current;

		const subscribeAutomaticTokenRefresh = async (delay) => {
			if (!refreshInterval.current) {
				refreshInterval.current = window.setTimeout(async () => {
					await getRefreshToken();
				}, delay);
			}
		};

		if (!isMounted.current) {
			console.log('try getting access token on page refresh');
			setIsTokenRefreshing(true);
			getRefreshToken();
			isMounted.current = true;
		} else if (!!accessToken) {
			console.log('automatic refresh subscription');
			const delay = calculateDelayFromJwt(accessToken);
			if (delay) {
				subscribeAutomaticTokenRefresh(delay);
			}
		}
		return () => {
			console.log('cleanup');
			window.clearTimeout(refreshInterval.current);
			currentAbortController.abort();
		};
	}, [getRefreshToken, accessToken]);

	const login = async (credentials) => {
		const { user: userData, accessToken: token } = await AuthService.login(
			credentials
		);
		setAccessToken(token);
		setUser(userData);
	};

	const register = async (userInput) => {
		const { user: userData, acessToken: token } = await AuthService.register(
			userInput
		);
		setAccessToken(token);
		setUser(userData);
	};

	const logout = async () => {
		console.log('logging out');
		console.log(accessToken);
		await AuthService.logout(accessToken);
		setAccessToken(null);
		setUser(null);
	};

	let value = {
		isAuthenticated: !!accessToken,
		accessToken,
		isTokenRefreshing,
		user,
		setUser,
		login,
		logout,
		register,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
	return useContext(AuthContext);
}

export { AuthProvider, useAuth };

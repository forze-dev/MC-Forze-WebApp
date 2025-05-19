import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../constants/config';
import axios from 'axios';

const AuthContext = createContext(null);

// Налаштовуємо інтерцептор для обробки 401 помилок
axios.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		// Якщо це 401 і запит ще не повторювався
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// Спробуємо оновити токен
				const refreshToken = localStorage.getItem('refresh_token');
				if (!refreshToken) throw new Error('No refresh token');

				const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
				const { token } = response.data;

				// Оновлюємо токен
				document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax;`;

				// Оновлюємо header і повторюємо запит
				originalRequest.headers['Authorization'] = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (err) {
				// Якщо не вдалося оновити токен, виходимо
				document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
				localStorage.removeItem('refresh_token');
				window.location.href = '/authorization';
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

// Створюємо провайдер
export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	// Функція отримання токену з cookies
	const getToken = () => {
		return document.cookie
			.split('; ')
			.find(row => row.startsWith('auth_token='))
			?.split('=')[1];
	};

	// Перевірка авторизації при завантаженні
	useEffect(() => {
		const token = getToken();

		if (token) {
			axios.get(`${API_BASE_URL}/auth/verify`, {
				headers: { 'Authorization': `Bearer ${token}` }
			})
				.then(res => {
					setUser(res.data.user);
				})
				.catch(() => {
					// При помилці очищуємо токени
					document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
					localStorage.removeItem('refresh_token');
				})
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, []);

	// Функція логіну
	const login = async (username, password) => {
		try {
			const res = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
			const { token, refreshToken, user } = res.data;

			// Зберігаємо токени
			document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax;`;
			localStorage.setItem('refresh_token', refreshToken);

			// Оновлюємо стан
			setUser(user);

			// Перенаправляємо, якщо була збережена адреса
			const params = new URLSearchParams(location.search);
			const returnUrl = params.get('returnUrl');

			if (returnUrl) {
				navigate(returnUrl);
			} else {
				navigate('/profile');
			}

			return user;
		} catch (error) {
			const message = error.response?.data?.message || 'Помилка авторизації';
			throw new Error(message);
		}
	};

	// Функція виходу
	const logout = async () => {
		try {
			const refreshToken = localStorage.getItem('refresh_token');
			const token = getToken();

			if (refreshToken && token) {
				// Повідомляємо сервер про вихід
				await axios.post(`${API_BASE_URL}/auth/logout`,
					{ refreshToken },
					{ headers: { 'Authorization': `Bearer ${token}` } }
				).catch(() => {
					// Ігноруємо помилки при виході
				});
			}
		} finally {
			// Очищуємо токени
			document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
			localStorage.removeItem('refresh_token');

			// Очищуємо стан
			setUser(null);

			// Перенаправляємо на головну
			navigate('/');
		}
	};

	// Функція оновлення даних користувача
	const refreshUserData = async () => {
		const token = getToken();

		if (!token) return false;

		try {
			const res = await axios.get(`${API_BASE_URL}/auth/verify`, {
				headers: { 'Authorization': `Bearer ${token}` }
			});

			setUser(res.data.user);
			return true;
		} catch (error) {
			return false;
		}
	};

	// Надаємо контекст компонентам
	return (
		<AuthContext.Provider value={{
			user,
			loading,
			login,
			logout,
			refreshUserData,
			isAuthenticated: !!user
		}}>
			{children}
		</AuthContext.Provider>
	);
}

// Хук для використання контексту
export function useAuth() {
	return useContext(AuthContext);
}
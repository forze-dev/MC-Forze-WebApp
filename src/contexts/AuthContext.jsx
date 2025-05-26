import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../constants/config';
import axios from 'axios';

const AuthContext = createContext(null);

// Створюємо окремий екземпляр axios без інтерцепторів для початкової перевірки
const authAxios = axios.create();

// Налаштовуємо інтерцептор тільки для основного axios
// і тільки для запитів, які потребують авторизації
axios.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		// Перевіряємо чи це запит, який потребує авторизації
		// і чи не є це запит логіну або верифікації
		const requiresAuth = originalRequest.headers?.['Authorization'];
		const isAuthEndpoint = originalRequest.url?.includes('/auth/');

		// Якщо це 401, запит має авторизацію, і це не auth ендпоінт
		if (error.response?.status === 401 && requiresAuth && !isAuthEndpoint && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// Спробуємо оновити токен
				const refreshToken = localStorage.getItem('refresh_token');
				if (!refreshToken) throw new Error('No refresh token');

				const response = await authAxios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
				const { token } = response.data;

				// Оновлюємо токен
				document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax;`;

				// Оновлюємо header і повторюємо запит
				originalRequest.headers['Authorization'] = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (err) {
				// Якщо не вдалося оновити токен, очищуємо дані
				document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
				localStorage.removeItem('refresh_token');

				// НЕ перенаправляємо автоматично - залишаємо це на розсуд компонентів
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
	const [initialized, setInitialized] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// Функція отримання токену з cookies
	const getToken = () => {
		return document.cookie
			.split('; ')
			.find(row => row.startsWith('auth_token='))
			?.split('=')[1];
	};

	// Перевірка авторизації тільки при ініціалізації
	useEffect(() => {
		const initializeAuth = async () => {
			const token = getToken();

			if (token) {
				try {
					// Використовуємо authAxios для уникнення циклічних запитів
					const res = await authAxios.get(`${API_BASE_URL}/auth/verify`, {
						headers: { 'Authorization': `Bearer ${token}` }
					});
					setUser(res.data.user);
				} catch (error) {
					// При помилці тихо очищуємо токени
					document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
					localStorage.removeItem('refresh_token');
				}
			}

			setLoading(false);
			setInitialized(true);
		};

		initializeAuth();
	}, []);

	// Функція логіну
	const login = async (username, password) => {
		try {
			const res = await authAxios.post(`${API_BASE_URL}/auth/login`, { username, password });
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
				await authAxios.post(`${API_BASE_URL}/auth/logout`,
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
			const res = await authAxios.get(`${API_BASE_URL}/auth/verify`, {
				headers: { 'Authorization': `Bearer ${token}` }
			});

			setUser(res.data.user);
			return true;
		} catch (error) {
			// При помилці очищуємо дані
			document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
			localStorage.removeItem('refresh_token');
			setUser(null);
			return false;
		}
	};

	// Надаємо контекст компонентам
	return (
		<AuthContext.Provider value={{
			user,
			loading,
			initialized,
			login,
			logout,
			refreshUserData,
			isAuthenticated: !!user,
			getToken // Додаємо для використання в сервісах
		}}>
			{children}
		</AuthContext.Provider>
	);
}

// Хук для використання контексту
export function useAuth() {
	return useContext(AuthContext);
}
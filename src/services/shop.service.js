import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

class ShopService {
	constructor() {
		this.baseURL = `${API_BASE_URL}/products`;
	}

	/**
	 * Отримати токен з cookies
	 */
	getToken() {
		return document.cookie
			.split('; ')
			.find(row => row.startsWith('auth_token='))
			?.split('=')[1];
	}

	/**
	 * Створити headers з токеном (якщо є)
	 */
	getHeaders() {
		const token = this.getToken();
		return token ? { 'Authorization': `Bearer ${token}` } : {};
	}

	/**
	 * Отримати всі товари з фільтрацією
	 * ПУБЛІЧНИЙ МЕТОД - не потребує авторизації
	 */
	async getProducts(params = {}) {
		try {
			const response = await axios.get(this.baseURL, {
				params: {
					is_active: 1,
					...params
				}
				// Не додаємо headers для публічного API
			});

			return response.data;
		} catch (error) {
			console.error('Помилка отримання товарів:', error);
			throw new Error('Не вдалося завантажити товари');
		}
	}

	/**
	 * Отримати товар за ID
	 * ПУБЛІЧНИЙ МЕТОД - не потребує авторизації
	 */
	async getProductById(productId) {
		try {
			const response = await axios.get(`${this.baseURL}/${productId}`);
			return response.data;
		} catch (error) {
			console.error('Помилка отримання товару:', error);
			throw new Error('Товар не знайдено');
		}
	}

	/**
	 * Отримати категорії товарів
	 * ПУБЛІЧНИЙ МЕТОД - не потребує авторизації
	 */
	async getCategories() {
		try {
			const response = await axios.get(`${this.baseURL}/categories`);
			return response.data;
		} catch (error) {
			console.error('Помилка отримання категорій:', error);
			throw new Error('Не вдалося завантажити категорії');
		}
	}

	/**
	 * Отримати типи товарів
	 * ПУБЛІЧНИЙ МЕТОД - не потребує авторизації
	 */
	async getProductTypes() {
		try {
			const response = await axios.get(`${this.baseURL}/types`);
			return response.data;
		} catch (error) {
			console.error('Помилка отримання типів товарів:', error);
			throw new Error('Не вдалося завантажити типи товарів');
		}
	}

	/**
	 * Купити товар
	 * ПРИВАТНИЙ МЕТОД - потребує авторизації
	 */
	async purchaseProduct(purchaseData) {
		try {
			const token = this.getToken();
			if (!token) {
				throw new Error('Для покупки потрібна авторизація');
			}

			const response = await axios.post(`${API_BASE_URL}/shop/purchase`, purchaseData, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});

			return response.data;
		} catch (error) {
			console.error('Помилка покупки:', error);
			const message = error.response?.data?.message || 'Помилка при покупці товару';
			throw new Error(message);
		}
	}

	/**
	 * Отримати історію покупок користувача
	 * ПРИВАТНИЙ МЕТОД - потребує авторизації
	 */
	async getPurchaseHistory(params = {}) {
		try {
			const token = this.getToken();
			if (!token) {
				throw new Error('Для перегляду історії потрібна авторизація');
			}

			const response = await axios.get(`${API_BASE_URL}/shop/purchases/history`, {
				params,
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			return response.data;
		} catch (error) {
			console.error('Помилка отримання історії покупок:', error);
			throw new Error('Не вдалося завантажити історію покупок');
		}
	}

	/**
	 * Перевірити чи користувач може купити товар
	 */
	canUserPurchaseProduct(product, userPurchaseHistory = []) {
		// Якщо немає ліміту на покупки
		if (!product.max_purchases_per_player || product.max_purchases_per_player <= 0) {
			return true;
		}

		// Рахуємо скільки разів користувач купляв цей товар
		const purchaseCount = userPurchaseHistory.filter(
			purchase => purchase.product?.id === product.id && purchase.status === 'completed'
		).length;

		return purchaseCount < product.max_purchases_per_player;
	}

	/**
	 * Розрахувати фінальну ціну з урахуванням знижки
	 */
	calculateFinalPrice(originalPrice, discountPercent = 0) {
		if (!originalPrice || discountPercent <= 0) {
			return originalPrice;
		}

		return Math.ceil(originalPrice * (100 - discountPercent) / 100);
	}

	/**
	 * Форматувати товар для відображення
	 */
	formatProductForDisplay(product, user = null, userPurchaseHistory = []) {
		const formattedProduct = {
			...product,
			canPurchase: true,
			discountedPrices: {
				game: product.game_price,
				donate: product.donate_price
			}
		};

		// Якщо користувач авторизований
		if (user) {
			// Перевіряємо чи може користувач купити товар
			formattedProduct.canPurchase = this.canUserPurchaseProduct(product, userPurchaseHistory);

			// Розраховуємо ціни з знижкою
			const discountPercent = user.discount_percent || 0;

			if (product.game_price && discountPercent > 0) {
				formattedProduct.discountedPrices.game = this.calculateFinalPrice(
					product.game_price,
					discountPercent
				);
			}

			if (product.donate_price && discountPercent > 0) {
				formattedProduct.discountedPrices.donate = this.calculateFinalPrice(
					product.donate_price,
					discountPercent
				);
			}

			// Додаємо інформацію про знижку
			formattedProduct.userDiscount = discountPercent;
			formattedProduct.hasDiscount = discountPercent > 0;
		}

		return formattedProduct;
	}

	/**
	 * Отримати відформатовані товари з урахуванням користувача
	 */
	async getFormattedProducts(params = {}, user = null) {
		try {
			const productsData = await this.getProducts(params);
			let userPurchaseHistory = [];

			// Якщо користувач авторизований, отримуємо його історію покупок
			if (user) {
				try {
					const historyData = await this.getPurchaseHistory({ limit: 1000 });
					userPurchaseHistory = historyData.purchases || [];
				} catch (error) {
					console.warn('Не вдалося завантажити історію покупок:', error);
					// Не кидаємо помилку - просто працюємо без істоpiї
				}
			}

			// Форматуємо товари
			const formattedProducts = productsData.products
				.map(product => this.formatProductForDisplay(product, user, userPurchaseHistory));

			return {
				...productsData,
				products: formattedProducts
			};
		} catch (error) {
			console.error('Помилка отримання відформатованих товарів:', error);
			throw error;
		}
	}

	/**
	 * Отримати рекомендовані товари
	 */
	async getRecommendedProducts(user = null, limit = 6) {
		try {
			const params = {
				limit,
				offset: 0
			};

			const data = await this.getFormattedProducts(params, user);
			return data.products;
		} catch (error) {
			console.error('Помилка отримання рекомендованих товарів:', error);
			return [];
		}
	}
}

// Створюємо та експортуємо єдиний екземпляр
const shopService = new ShopService();
export default shopService;
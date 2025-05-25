// src/services/promocodes.service.js
// Сервіс для роботи з промокодами на фронтенді - валідація та застосування

import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

class PromocodesService {
	constructor() {
		this.baseURL = `${API_BASE_URL}/promocodes`;
	}

	/**
	 * Перевірка валідності промокоду
	 * @param {string} code - Код промокоду
	 * @param {number} productId - ID товару (опціонально)
	 * @returns {Promise<Object>} Результат валідації
	 */
	async validatePromocode(code, productId = null) {
		try {
			const params = { code };
			if (productId) {
				params.productId = productId;
			}

			const response = await axios.get(`${this.baseURL}/validate`, {
				params
			});

			return response.data;
		} catch (error) {
			// Повертаємо помилку у зручному форматі
			if (error.response?.data) {
				throw new Error(error.response.data.message || 'Помилка перевірки промокоду');
			}
			throw new Error('Не вдалося перевірити промокод');
		}
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
	 * Форматування тексту промокоду для відображення
	 * @param {Object} promocode - Об'єкт промокоду
	 * @returns {string} Відформатований текст
	 */
	formatPromocodeText(promocode) {
		let text = `Знижка ${promocode.discount_percent}%`;

		if (promocode.uses_left) {
			text += ` (залишилось використань: ${promocode.uses_left})`;
		}

		return text;
	}

	/**
	 * Перевірка чи промокод ще активний
	 * @param {Object} promocode - Об'єкт промокоду
	 * @returns {boolean} Чи активний промокод
	 */
	isPromocodeActive(promocode) {
		const now = Math.floor(Date.now() / 1000);

		// Перевіряємо активність
		if (!promocode.is_active) {
			return false;
		}

		// Перевіряємо дату початку
		if (promocode.start_date && promocode.start_date > now) {
			return false;
		}

		// Перевіряємо дату закінчення
		if (promocode.end_date && promocode.end_date < now) {
			return false;
		}

		// Перевіряємо кількість використань
		if (promocode.uses_left !== null && promocode.uses_left <= 0) {
			return false;
		}

		return true;
	}
}

// Створюємо та експортуємо єдиний екземпляр
const promocodesService = new PromocodesService();
export default promocodesService;
// src/services/transfer.service.js
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

class TransferService {
	constructor() {
		this.baseURL = `${API_BASE_URL}/transfer`;
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
	 * Створити headers з токеном
	 */
	getHeaders() {
		const token = this.getToken();
		return token ? { 'Authorization': `Bearer ${token}` } : {};
	}

	/**
	 * Переказ ігрової валюти
	 * @param {Object} transferData - Дані переказу
	 * @param {string} transferData.recipientNick - Нік отримувача
	 * @param {number} transferData.amount - Сума переказу
	 * @param {string} transferData.message - Повідомлення (опціонально)
	 * @returns {Promise<Object>} Результат переказу
	 */
	async sendTransfer(transferData) {
		try {
			const token = this.getToken();
			if (!token) {
				throw new Error('Для переказу потрібна авторизація');
			}

			const response = await axios.post(`${this.baseURL}/send`, transferData, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});

			return response.data;
		} catch (error) {
			const message = error.response?.data?.message || 'Помилка при переказі коштів';
			const suggestion = error.response?.data?.suggestion || '';
			const customError = new Error(message);
			if (suggestion) {
				customError.suggestion = suggestion;
			}
			throw customError;
		}
	}

	/**
	 * Розрахунок комісії для переказу
	 * @param {number} amount - Сума переказу
	 * @returns {Promise<Object>} Розрахунок комісії
	 */
	async calculateCommission(amount) {
		try {
			const response = await axios.get(`${this.baseURL}/calculate-commission`, {
				params: { amount }
			});

			return response.data;
		} catch (error) {
			console.error('Помилка розрахунку комісії:', error);
			throw new Error('Не вдалося розрахувати комісію');
		}
	}

	/**
	 * Отримати історію переказів
	 * @param {Object} params - Параметри запиту
	 * @param {number} params.page - Номер сторінки
	 * @param {number} params.limit - Кількість записів на сторінку
	 * @param {string} params.type - Тип переказів ('all', 'sent', 'received')
	 * @returns {Promise<Object>} Історія переказів
	 */
	async getTransferHistory(params = {}) {
		try {
			const token = this.getToken();
			if (!token) {
				throw new Error('Для перегляду історії потрібна авторизація');
			}

			const response = await axios.get(`${this.baseURL}/history`, {
				params,
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			return response.data;
		} catch (error) {
			console.error('Помилка отримання історії переказів:', error);
			throw new Error('Не вдалося завантажити історію переказів');
		}
	}

	/**
	 * Отримати статистику переказів
	 * @returns {Promise<Object>} Статистика переказів
	 */
	async getTransferStats() {
		try {
			const token = this.getToken();
			if (!token) {
				throw new Error('Для перегляду статистики потрібна авторизація');
			}

			const response = await axios.get(`${this.baseURL}/stats`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			return response.data;
		} catch (error) {
			console.error('Помилка отримання статистики переказів:', error);
			throw new Error('Не вдалося завантажити статистику переказів');
		}
	}

	/**
	 * Валідація даних переказу
	 * @param {string} recipientNick - Нік отримувача
	 * @param {number} amount - Сума переказу
	 * @returns {Array<string>} Масив помилок валідації
	 */
	validateTransferData(recipientNick, amount) {
		const errors = [];

		if (!recipientNick || recipientNick.trim().length === 0) {
			errors.push('Введіть нік отримувача');
		}

		if (recipientNick && recipientNick.trim().length < 3) {
			errors.push('Нік має містити мінімум 3 символи');
		}

		if (!amount || amount <= 0) {
			errors.push('Введіть суму переказу');
		}

		if (amount && amount < 10) {
			errors.push('Мінімальна сума переказу: 10 GFC');
		}

		if (amount && !Number.isInteger(Number(amount))) {
			errors.push('Сума має бути цілим числом');
		}

		return errors;
	}

	/**
	 * Форматування суми з комісією
	 * @param {number} amount - Основна сума
	 * @param {number} commission - Комісія
	 * @returns {string} Відформатований текст
	 */
	formatTransferAmount(amount, commission) {
		const total = amount + commission;
		return `${amount} GFC + ${commission} GFC (комісія) = ${total} GFC`;
	}

	/**
	 * Форматування дати переказу
	 * @param {number} timestamp - Unix timestamp
	 * @returns {string} Відформатована дата
	 */
	formatTransferDate(timestamp) {
		const date = new Date(timestamp * 1000);
		return date.toLocaleString('uk-UA', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
}

// Створюємо та експортуємо єдиний екземпляр
const transferService = new TransferService();
export default transferService;
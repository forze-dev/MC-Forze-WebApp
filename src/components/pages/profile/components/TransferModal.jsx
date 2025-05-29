// src/components/pages/profile/components/TransferModal.jsx
import { useState, useEffect } from 'react';
import { Send, X, User, MessageCircle } from 'lucide-react';
import transferService from '../../../../services/transfer.service';
import { useAuth } from '../../../../contexts/AuthContext';
import '../styles/TransferModal.scss';

const TransferModal = ({ isOpen, onClose, onSuccess }) => {
	const { user, refreshUserData } = useAuth();
	const [formData, setFormData] = useState({
		recipientNick: '',
		amount: '',
		message: ''
	});
	const [commission, setCommission] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [isCalculatingCommission, setIsCalculatingCommission] = useState(false);

	// Очищення форми при відкритті/закритті модалки
	useEffect(() => {
		if (isOpen) {
			setFormData({
				recipientNick: '',
				amount: '',
				message: ''
			});
			setCommission(null);
			setError('');
			setSuccess('');
		}
	}, [isOpen]);

	// Розрахунок комісії при зміні суми
	useEffect(() => {
		const calculateCommissionDebounced = setTimeout(async () => {
			if (formData.amount && formData.amount >= 10) {
				setIsCalculatingCommission(true);
				try {
					const commissionData = await transferService.calculateCommission(parseInt(formData.amount));
					setCommission(commissionData);
					setError('');
				} catch (err) {
					setCommission(null);
					console.error('Помилка розрахунку комісії:', err);
				} finally {
					setIsCalculatingCommission(false);
				}
			} else {
				setCommission(null);
			}
		}, 500);

		return () => clearTimeout(calculateCommissionDebounced);
	}, [formData.amount]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setError('');
		setSuccess('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			// Валідація
			const errors = transferService.validateTransferData(
				formData.recipientNick.trim(),
				parseInt(formData.amount)
			);

			if (errors.length > 0) {
				setError(errors[0]);
				setIsLoading(false);
				return;
			}

			// Перевірка балансу
			if (!commission) {
				setError('Не вдалося розрахувати комісію');
				setIsLoading(false);
				return;
			}

			if (user.game_balance < commission.totalDeduction) {
				setError(`Недостатньо коштів. Потрібно: ${commission.totalDeduction} GFC, у вас: ${user.game_balance} GFC`);
				setIsLoading(false);
				return;
			}

			// Відправляємо переказ
			const transferData = {
				recipientNick: formData.recipientNick.trim(),
				amount: parseInt(formData.amount),
				message: formData.message.trim() || null
			};

			const result = await transferService.sendTransfer(transferData);

			setSuccess(`Переказ успішно виконано! ${result.transfer.recipient} отримав ${result.transfer.amount} GFC`);

			// Оновлюємо баланс користувача
			await refreshUserData();

			// Викликаємо callback про успішний переказ
			if (onSuccess) {
				onSuccess(result);
			}
		} catch (err) {
			console.error(err.suggestion);
			if (err.suggestion) {
				setError(err.message + '. ' + err.suggestion);
			} else {
				setError(err.message);
			}
		}
		finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		if (!isLoading) {
			onClose();
		}
	};

	if (!isOpen) return null;

	const canTransfer = formData.recipientNick.trim() &&
		formData.amount &&
		parseInt(formData.amount) >= 10 &&
		commission &&
		user.game_balance >= commission.totalDeduction &&
		!isLoading;

	return (
		<div className="transfer-modal-overlay" onClick={handleClose}>
			<div className="transfer-modal" onClick={(e) => e.stopPropagation()}>
				<div className="transfer-modal__header">
					<h3>Переказ GFC</h3>
					<button
						className="transfer-modal__close"
						onClick={handleClose}
						disabled={isLoading}
					>
						<X size={20} />
					</button>
				</div>

				<div className="transfer-modal__content">
					{/* Баланс користувача */}
					<div className="transfer-modal__balance-info">
						<span className="balance-label">Ваш поточний баланс:</span>
						<span className="balance-value">
							<img src="/assets/icons/GFC.svg" alt="GFC" width={16} height={16} />
							{user.game_balance.toLocaleString()} GFC
						</span>
					</div>

					{/* Повідомлення про успіх */}
					{success && (
						<div className="transfer-modal__success">
							{success}
						</div>
					)}

					{/* Повідомлення про помилку */}
					{error && (
						<div className="transfer-modal__error">
							{error}
						</div>
					)}

					{/* Форма переказу */}
					<form className="transfer-modal__form" onSubmit={handleSubmit}>
						{/* Нік отримувача */}
						<div className="transfer-modal__field">
							<label>
								<User size={16} />
								Нік отримувача
							</label>
							<input
								type="text"
								name="recipientNick"
								value={formData.recipientNick}
								onChange={handleInputChange}
								placeholder="Введіть Minecraft нік"
								disabled={isLoading}
								maxLength={16}
								required
							/>
							<span className="field-hint">
								Введіть точний Minecraft нік гравця
							</span>
						</div>

						{/* Сума переказу */}
						<div className="transfer-modal__field">
							<label>
								<img src="/assets/icons/GFC.svg" alt="GFC" width={16} height={16} />
								Сума переказу
							</label>
							<input
								type="number"
								name="amount"
								value={formData.amount}
								onChange={handleInputChange}
								placeholder="Введіть суму"
								disabled={isLoading}
								min="10"
								max={user.game_balance}
								required
							/>
							<span className="field-hint">
								Мінімальна сума: 10 GFC
							</span>
						</div>

						{/* Повідомлення (опціонально) */}
						<div className="transfer-modal__field">
							<label>
								<MessageCircle size={16} />
								Повідомлення (опціонально)
							</label>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleInputChange}
								placeholder="Додайте повідомлення до переказу..."
								disabled={isLoading}
								maxLength={200}
							/>
							<span className="field-hint">
								Максимум 200 символів
							</span>
						</div>

						{/* Розрахунок комісії */}
						{(commission || isCalculatingCommission) && (
							<div className="transfer-modal__commission">
								<div className="transfer-modal__commission-header">
									Розрахунок переказу
								</div>
								<div className="transfer-modal__commission-breakdown">
									{isCalculatingCommission ? (
										<div>Розраховуємо комісію...</div>
									) : commission ? (
										<>
											<div className="commission-line">
												<span>Сума переказу:</span>
												<span>{commission.amount} GFC</span>
											</div>
											<div className="commission-line">
												<span>Комісія (15%):</span>
												<span>{commission.commission} GFC</span>
											</div>
											<div className="commission-line total">
												<span>До списання:</span>
												<span>{commission.totalDeduction} GFC</span>
											</div>
										</>
									) : null}
								</div>
							</div>
						)}

						{/* Кнопки дій */}
						<div className="transfer-modal__actions">
							<button
								type="button"
								className="cancel-btn"
								onClick={handleClose}
								disabled={isLoading}
							>
								Скасувати
							</button>
							<button
								type="submit"
								className={`transfer-btn ${isLoading ? 'loading' : ''}`}
								disabled={!canTransfer}
							>
								{isLoading ? (
									'Переказуємо...'
								) : (
									<>
										<Send size={16} />
										Переказати
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TransferModal;
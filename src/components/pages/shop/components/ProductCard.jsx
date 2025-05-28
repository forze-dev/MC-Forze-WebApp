// src/components/pages/shop/components/ProductCard.jsx
// Компонент карточки товару з підтримкою промокодів
// Оновлена версія з полем для введення промокоду та застосуванням знижок

import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import shopService from '../../../../services/shop.service';
import promocodesService from '../../../../services/promocodes.service';
import { API_BASE_URL } from '../../../../constants/config';
import '../styles/promocode-styles.scss';
import '../styles/product-card.scss';

const ProductCard = ({ product, onPurchaseSuccess }) => {
	const { user, isAuthenticated, refreshUserData } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [showPurchaseModal, setShowPurchaseModal] = useState(false);

	// Стан для промокодів
	const [promocodeInput, setPromocodeInput] = useState('');
	const [appliedPromocode, setAppliedPromocode] = useState(null);
	const [promocodeLoading, setPromocodeLoading] = useState(false);
	const [promocodeError, setPromocodeError] = useState('');

	// Отримуємо першу доступну ціну для відображення
	const getDisplayPrice = () => {
		if (product.discountedPrices.game) {
			return {
				price: product.discountedPrices.game,
				originalPrice: product.game_price,
				currency: 'game',
				currencyText: "GFC",
				currencySymbol: <img src='/assets/icons/GFC.svg' width={18} height={18} />
			};
		}
		if (product.discountedPrices.donate) {
			return {
				price: product.discountedPrices.donate,
				originalPrice: product.donate_price,
				currency: 'donate',
				currencyText: "DFC",
				currencySymbol: <img src='/assets/icons/DFC.svg' width={18} height={18} />
			};
		}
		return null;
	};

	// Розрахунок ціни з урахуванням промокоду
	const calculatePriceWithPromocode = (originalPrice, userDiscount = 0, promocodeDiscount = 0) => {
		// Застосовуємо найбільшу знижку
		const maxDiscount = Math.max(userDiscount, promocodeDiscount);
		return Math.ceil(originalPrice * (100 - maxDiscount) / 100);
	};

	// Застосування промокоду
	const handleApplyPromocode = async () => {
		if (!promocodeInput.trim()) {
			setPromocodeError('Введіть промокод');
			return;
		}

		setPromocodeLoading(true);
		setPromocodeError('');

		try {
			const result = await promocodesService.validatePromocode(
				promocodeInput.trim(),
				product.id
			);

			if (result.valid) {
				setAppliedPromocode(result.promocode);
				setPromocodeError('');
			}
		} catch (error) {
			setPromocodeError(error.message);
			setAppliedPromocode(null);
		} finally {
			setPromocodeLoading(false);
		}
	};

	// Скидання промокоду
	const handleRemovePromocode = () => {
		setAppliedPromocode(null);
		setPromocodeInput('');
		setPromocodeError('');
	};

	// Обробка покупки з промокодом
	const handlePurchase = async (paymentCurrency) => {
		if (!isAuthenticated) {
			window.location.href = '/authorization';
			return;
		}

		setIsLoading(true);
		try {
			const purchaseData = {
				productId: product.id,
				paymentCurrency
			};

			// Додаємо промокод якщо застосований
			if (appliedPromocode) {
				purchaseData.promocodeId = appliedPromocode.id;
			}

			const result = await shopService.purchaseProduct(purchaseData);

			alert(`Покупка успішна! ${result.execution.message || ''}`);

			// Оновлюємо дані користувача
			await refreshUserData();

			// Викликаємо callback для оновлення списку
			if (onPurchaseSuccess) {
				onPurchaseSuccess(product.id);
			}

			setShowPurchaseModal(false);

			// Очищаємо промокод після успішної покупки
			handleRemovePromocode();
		} catch (error) {
			alert(`Помилка покупки: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	// Отримуємо ціни з урахуванням промокоду
	const getPriceWithPromocode = (originalPrice, currency) => {
		const userDiscount = product.userDiscount || 0;
		const promocodeDiscount = appliedPromocode?.discount_percent || 0;

		return calculatePriceWithPromocode(originalPrice, userDiscount, promocodeDiscount);
	};

	const displayPrice = getDisplayPrice();

	if (!displayPrice) {
		return null;
	}

	return (
		<>
			<div className="product-card">
				<div className="product-card__image">
					{product.images && product.images.length > 0 ? (
						<img
							src={API_BASE_URL + product.images[0]}
							alt={product.name}
							onError={(e) => {
								e.target.src = '/assets/images/placeholder-product.png';
							}}
						/>
					) : (
						<div className="placeholder-image">
							<span>Без фото</span>
						</div>
					)}
				</div>

				<div className="product-card__content">
					<div className="product-card__header">
						<h3 className="product-card__title">{product.name}</h3>
						<span className="product-card__type">{product.product_type}</span>
					</div>

					{product.description && (
						<p className="product-card__description">
							{product.description.length > 100
								? `${product.description.substring(0, 100)}...`
								: product.description
							}
						</p>
					)}

					<div className="product-card__footer">
						<div className="product-card__price">
							<span className="current-price">
								{displayPrice.currencySymbol} {displayPrice.price}
							</span>

							{product.hasDiscount && displayPrice.originalPrice !== displayPrice.price && (
								<span className="original-price">
									{displayPrice.originalPrice} {displayPrice.currencyText}
								</span>
							)}

							{product.hasDiscount && (
								<span className="discount-badge">
									-{product.userDiscount}%
								</span>
							)}
						</div>

						<button
							className="product-card__buy-btn"
							onClick={() => setShowPurchaseModal(true)}
							disabled={isLoading}
						>
							{isLoading ? 'Обробка...' : 'Купити'}
						</button>
					</div>

					{/* {product.max_purchases_per_player > 0 && (
						<div className="product-card__limit">
							Ліміт: {product.max_purchases_per_player} шт.
						</div>
					)} */}
				</div>
			</div>

			{/* Модальне вікно покупки з промокодами */}
			{showPurchaseModal && (
				<div className="purchase-modal-overlay" onClick={() => setShowPurchaseModal(false)}>
					<div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
						<div className="purchase-modal__header">
							<h3>Купити "{product.name}"</h3>
							<button
								className="purchase-modal__close"
								onClick={() => setShowPurchaseModal(false)}
							>
								×
							</button>
						</div>

						<div className="purchase-modal__content">
							{/* Поле для промокоду */}
							<div className="promocode-section">
								<h4>Промокод</h4>
								{!appliedPromocode ? (
									<div className="promocode-input-group">
										<input
											type="text"
											placeholder="Введіть промокод"
											value={promocodeInput}
											onChange={(e) => setPromocodeInput(e.target.value.toUpperCase())}
											disabled={promocodeLoading}
											className="promocode-input"
										/>
										<button
											className="promocode-apply-btn"
											onClick={handleApplyPromocode}
											disabled={promocodeLoading || !promocodeInput.trim()}
										>
											{promocodeLoading ? 'Перевірка...' : 'Застосувати'}
										</button>
									</div>
								) : (
									<div className="promocode-applied">
										<div className="promocode-success">
											Промокод "{appliedPromocode.code}" застосовано!
											Знижка: {appliedPromocode.discount_percent}%
										</div>
										<button
											className="promocode-remove-btn"
											onClick={handleRemovePromocode}
										>
											Видалити
										</button>
									</div>
								)}

								{promocodeError && (
									<div className="promocode-error">
										❌ {promocodeError}
									</div>
								)}
							</div>

							<p>Оберіть валюту для миттєвої оплати:</p>

							<div className="purchase-modal__options">
								{product.game_price && (
									<button
										className="purchase-option"
										onClick={() => handlePurchase('game')}
										disabled={isLoading}
									>
										<div className="purchase-option__price">
											<img src="/assets/icons/GFC.svg" alt="G" width={32} height={32} />
											{getPriceWithPromocode(product.game_price, 'game')} GFC
											{(product.hasDiscount || appliedPromocode) && (
												<span className="original-price">{product.game_price} GFC</span>
											)}
										</div>
										<div className="purchase-option__currency">Ігрова валюта</div>
										{isAuthenticated && user && (
											<div className="purchase-option__balance">
												Баланс: {user.game_balance} GFC
											</div>
										)}
									</button>
								)}

								{product.donate_price && (
									<button
										className="purchase-option"
										onClick={() => handlePurchase('donate')}
										disabled={isLoading}
									>
										<div className="purchase-option__price" style={{ color: "#FBFF00" }}>
											<img src="/assets/icons/DFC.svg" alt="G" width={32} height={32} />
											{getPriceWithPromocode(product.donate_price, 'donate')} DFC
											{(product.hasDiscount || appliedPromocode) && (
												<span className="original-price">{product.donate_price} DFC</span>
											)}
										</div>
										<div className="purchase-option__currency">Донат валюта</div>
										{isAuthenticated && user && (
											<div className="purchase-option__balance">
												Баланс: {user.donate_balance} DFC
											</div>
										)}
									</button>
								)}
							</div>

							{!isAuthenticated && (
								<div className="purchase-modal__auth-notice">
									<p>Для покупки потрібна авторизація</p>
									<button
										className="auth-btn"
										onClick={() => window.location.href = '/authorization'}
									>
										Увійти
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductCard;
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import shopService from '../../../../services/shop.service';
import { API_BASE_URL } from '../../../../constants/config';
import '../styles/product-card.scss';

const ProductCard = ({ product, onPurchaseSuccess }) => {
	const { user, isAuthenticated, refreshUserData } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [showPurchaseModal, setShowPurchaseModal] = useState(false);

	// Отримуємо першу доступну ціну для відображення
	const getDisplayPrice = () => {
		if (product.discountedPrices.game) {
			return {
				price: product.discountedPrices.game,
				originalPrice: product.game_price,
				currency: 'game',
				currencySymbol: 'GFC'
			};
		}
		if (product.discountedPrices.donate) {
			return {
				price: product.discountedPrices.donate,
				originalPrice: product.donate_price,
				currency: 'donate',
				currencySymbol: 'DFC'
			};
		}
		return null;
	};

	// Обробка покупки
	const handlePurchase = async (paymentCurrency) => {
		if (!isAuthenticated) {
			// Перенаправляємо на сторінку авторизації
			window.location.href = '/authorization';
			return;
		}

		setIsLoading(true);
		try {
			const result = await shopService.purchaseProduct({
				productId: product.id,
				paymentCurrency
			});

			alert(`Покупка успішна! ${result.execution.message || ''}`);

			// Показуємо повідомлення про успішну покупку
			await refreshUserData()

			// Викликаємо callback для оновлення списку
			if (onPurchaseSuccess) {
				onPurchaseSuccess(product.id);
			}

			setShowPurchaseModal(false);
		} catch (error) {
			alert(`Помилка покупки: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const displayPrice = getDisplayPrice();

	if (!displayPrice) {
		return null; // Не показуємо товар без ціни
	}

	return (
		<>
			<div className="product-card">
				<div className="product-card__image">
					{product.images && product.images.length > 0 ? (
						<img
							// src={API_BASE_URL + product.images[0]}
							src={"/test.png"}
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
								{displayPrice.price} {displayPrice.currencySymbol}
							</span>

							{product.hasDiscount && displayPrice.originalPrice !== displayPrice.price && (
								<span className="original-price">
									{displayPrice.originalPrice} {displayPrice.currencySymbol}
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

					{product.max_purchases_per_player > 0 && (
						<div className="product-card__limit">
							Ліміт: {product.max_purchases_per_player} шт.
						</div>
					)}
				</div>
			</div>

			{/* Модальне вікно покупки */}
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
							<p>Оберіть валюту для оплати:</p>

							<div className="purchase-modal__options">
								{product.game_price && (
									<button
										className="purchase-option"
										onClick={() => handlePurchase('game')}
										disabled={isLoading}
									>
										<div className="purchase-option__price">
											{product.discountedPrices.game} GFC
											{product.hasDiscount && product.game_price !== product.discountedPrices.game && (
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
										<div className="purchase-option__price">
											{product.discountedPrices.donate} DFC
											{product.hasDiscount && product.donate_price !== product.discountedPrices.donate && (
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
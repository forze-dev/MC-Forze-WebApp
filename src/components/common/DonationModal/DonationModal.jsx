import React, { useState } from 'react';
import './DonationModal.scss';

const DonationModal = ({ isOpen, onClose }) => {
	const donationPackages = [
		{
			id: 1,
			dfc: 50,
			price: 50,
			originalPrice: 50,
			discount: 0
		},
		{
			id: 2,
			dfc: 100,
			price: 95,
			originalPrice: 100,
			discount: 5
		},
		{
			id: 3,
			dfc: 200,
			price: 180,
			originalPrice: 200,
			discount: 10
		},
		{
			id: 4,
			dfc: 500,
			price: 425,
			originalPrice: 500,
			discount: 15
		},
		{
			id: 5,
			dfc: 1000,
			price: 800,
			originalPrice: 1000,
			discount: 20
		}
	];

	const handlePurchase = (packageData) => {
		// Тут буде перехід на Way For Pay
		console.log('Покупка пакету:', packageData);
		// onClose(); // Закриваємо модалку після вибору
	};

	if (!isOpen) return null;

	return (
		<>
			<div className="donation-modal-overlay" onClick={onClose}></div>
			<div className="donation-modal">
				<div className="donation-modal__header">
					<h2>Підтримати сервер</h2>
					<button className="donation-modal__close" onClick={onClose}>
						✕
					</button>
				</div>

				<div className="donation-modal__content">
					<p className="donation-modal__description">
						Оберіть пакет донат балансу для підтримки проєкту
					</p>

					<div className="donation-packages">
						{donationPackages.map((pkg) => (
							<div key={pkg.id} className="donation-package">
								<div className="package-info">
									<div className="package-dfc">
										<img src="/assets/icons/DFC.svg" alt="G" width={28} height={28} />
										<span>
											{pkg.dfc} DFC
										</span>
									</div>
									<div className="package-price">
										<span className="current-price">{pkg.price} грн</span>
										{pkg.discount > 0 && (
											<>
												<span className="original-price">{pkg.originalPrice} грн</span>
												<span className="discount-badge">-{pkg.discount}%</span>
											</>
										)}
									</div>
								</div>
								<button
									className="package-buy-btn"
									onClick={() => handlePurchase(pkg)}
								>
									Купити
								</button>
							</div>
						))}
					</div>

					<div className="donation-modal__disclaimer">
						<p>
							<strong>Важливо:</strong> Донат баланс — це добровільна підтримка проєкту.
							За донат гравці отримують бонуси в грі. Баланс не є платіжним засобом,
							не виводиться, не конвертується — використовується тільки всередині гри.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

// Компонент кнопки для відкриття модалки
const DonationButton = ({ className = "" }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				className={`donation-button ${className}`}
				onClick={() => setIsModalOpen(true)}
			>
				💝 Задонатити
			</button>

			<DonationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};
export default DonationButton;
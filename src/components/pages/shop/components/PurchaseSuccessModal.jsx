// src/components/pages/shop/components/PurchaseSuccessModal.jsx
import { useEffect } from 'react';
import { Check, Package } from 'lucide-react';
import '../styles/purchase-success-modal.scss';

const PurchaseSuccessModal = ({
	isOpen,
	onClose,
	productName,
	hasStorageItems = false
}) => {
	// Закриття модалки при натисканні Escape
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyPress);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="purchase-success-overlay" onClick={onClose}>
			<div className="purchase-success-modal" onClick={(e) => e.stopPropagation()}>
				<div className="purchase-success-modal__header">
					<div className="success-icon">
						<Check size={32} />
					</div>
					<h3>Покупка успішно завершена!</h3>
				</div>

				<div className="purchase-success-modal__content">
					<p className="product-info">
						Ви успішно придбали товар <strong>"{productName}"</strong>
					</p>

					{hasStorageItems && (
						<div className="storage-notice">
							<div className="storage-notice__icon">
								<Package size={24} />
							</div>
							<div className="storage-notice__content">
								<h4>Зверніть увагу!</h4>
								<p>
									Деякі предмети потрапили у ваше персональне сховище,
									яке ви можете відкрити в грі командою:
								</p>
								<div className="command-block">
									<code>/storage open</code>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="purchase-success-modal__footer">
					<button
						className="success-btn"
						onClick={onClose}
					>
						Зрозуміло
					</button>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessModal;
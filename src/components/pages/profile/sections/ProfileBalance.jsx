// src/pages/profile/sections/ProfileBalance.jsx
import { Send } from 'lucide-react';

function ProfileBalance({ user, setShowTransferModal }) {

	return (
		<>
			<div className="profile-card balance-card">
				<div className="card-header">
					<h3 className="card-title">
						<span className="card-icon">💰</span>
						Баланс
					</h3>
				</div>

				<div className="balance-content">
					<div className="balance-item game-balance">
						<div className="balance-info">
							<span className="balance-label">Ігрова валюта</span>
							<span className="balance-value">{user.game_balance?.toLocaleString() || 0}</span>
						</div>
						<div className="balance-icon" style={{ height: "38px" }}>
							<img src="/assets/icons/GFC.svg" alt="GFC" />
						</div>
					</div>

					<div className="balance-item donate-balance">
						<div className="balance-info">
							<span className="balance-label">Донат баланс</span>
							<span className="balance-value">{user.donate_balance?.toLocaleString() || 0}</span>
						</div>
						<div className="balance-icon" style={{ height: "38px" }}>
							<img src="/assets/icons/DFC.svg" alt="DFC" />
						</div>
					</div>

					{user.discount_percent && (
						<div className="discount-section">
							<div className="discount-header">
								<span className="discount-label">
									<span className="discount-icon">🏷️</span>
									Персональна знижка
								</span>
							</div>
							<div className="discount-progress">
								<div className="progress-bar">
									<div
										className="progress-fill"
										style={{ width: `${(user.discount_percent / 40) * 100}%` }}
									></div>
								</div>
								<div className="progress-text">
									<span className="current-discount">{user.discount_percent}%</span>
									<span className="max-discount">/ 40%</span>
								</div>
							</div>
						</div>
					)}

					{/* Кнопка переказу GFC */}
					<div className="transfer-section">
						<button
							className="transfer-btn"
							onClick={() => setShowTransferModal(true)}
							disabled={!user.game_balance || user.game_balance < 10}
							title={user.game_balance < 10 ? 'Мінімальна сума для переказу: 10 GFC' : 'Переказати GFC іншому гравцю'}
						>
							<Send size={16} />
							Переказати GFC
						</button>
						{user.game_balance < 10 && (
							<span className="transfer-hint">
								Мінімальна сума для переказу: 10 GFC
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
export default ProfileBalance;
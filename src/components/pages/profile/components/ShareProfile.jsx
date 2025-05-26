import { useState, useRef } from 'react';
import { Download, Send } from 'lucide-react';
import html2canvas from 'html2canvas';
import ProfileBalance from '../sections/ProfileBalance';
import ProfileStats from '../sections/ProfileStats';
import ProfileGameStats from '../sections/ProfileGameStats';

const ProfileShareGenerator = ({ user }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const shareRef = useRef(null);

	// Генерація картинки профілю
	const generateProfileImage = async () => {
		setIsLoading(true);
		setIsGenerating(true);

		try {
			// Показуємо елемент для скріншоту
			const element = shareRef.current;
			if (!element) return null;

			// Робимо елемент видимим для скріншоту
			element.style.position = 'absolute';
			element.style.top = '-99999px';
			element.style.left = '-99999px';
			element.style.zIndex = '-9999';
			element.style.transform = 'scale(1)';

			await new Promise(resolve => setTimeout(resolve, 500)); // Даємо час відрендеритись

			const canvas = await html2canvas(element, {
				backgroundColor: '#022722',
				scale: 1.5, // Для кращої якості
				width: 1024,
				height: 1868,
				useCORS: true,
				allowTaint: true,
				scrollX: 0,
				scrollY: 0,
			});

			// Ховаємо елемент назад
			element.style.position = 'absolute';
			element.style.top = '-9999px';
			element.style.left = '-9999px';
			element.style.zIndex = '-1';

			return canvas;
		} catch (error) {
			console.error('Помилка створення картинки:', error);
			return null;
		} finally {
			setIsLoading(false);
			setIsGenerating(false);
		}
	};

	// Скачати як PNG
	const downloadImage = async () => {
		const canvas = await generateProfileImage();
		if (!canvas) return;

		canvas.toBlob((blob) => {
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.download = `${user.minecraft_nick || user.minecraftNick}_profile.png`;
			link.href = url;
			link.click();
			URL.revokeObjectURL(url);
		}, 'image/png');
	};

	// Поділитися в Telegram
	const shareToTelegram = async () => {
		const canvas = await generateProfileImage();
		if (!canvas) return;

		canvas.toBlob(async (blob) => {
			try {
				if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'profile.png', { type: 'image/png' })] })) {
					// Використовуємо Web Share API якщо доступно
					const file = new File([blob], `${user.minecraft_nick}_profile.png`, { type: 'image/png' });
					await navigator.share({
						title: `Профіль ${user.minecraft_nick} - Forze Space`,
						text: `Подивіться на мій профіль на сервері Forze Space!`,
						files: [file]
					});
				} else {
					// Відкриваємо Telegram Web
					const statsText = `🎮 Мій профіль на Forze Space!\n\n💰 GFC: ${user.game_balance?.toLocaleString() || 0}\n💎 DFC: ${user.donate_balance?.toLocaleString() || 0}${user.discount_percent ? `\n🏷️ Знижка: ${user.discount_percent}%` : ''}\n\n⚡ Приєднуйся: mine.forze.space`;

					window.open(`https://t.me/share/url?url=https://forze.space&text=${encodeURIComponent(statsText)}`);
				}
			} catch (error) {
				console.error('Помилка шерингу:', error);
				// Фолбек - просто скачуємо файл
				await downloadImage();
			}
		}, 'image/png');
	};

	return (
		<div className="profile-share-container">
			{/* Кнопки управління */}
			<div className="container">
				<div className="share-controls">
					<button
						className="share-btn download-btn"
						onClick={downloadImage}
						disabled={isLoading}
					>
						<Download size={18} />
						{isLoading ? 'Створення...' : 'Скачати PNG'}
					</button>

					<button
						className="share-btn telegram-btn"
						onClick={shareToTelegram}
						disabled={isLoading}
					>
						<Send size={18} />
						Поділитися в Telegram
					</button>
				</div>
			</div>

			{/* Прихований контейнер для генерації картинки */}
			<div
				ref={shareRef}
				className={`profile-share-capture ${isGenerating ? 'generating' : ''}`}
			>
				<div className="share-wrapper">
					{/* Хедер профілю */}
					<div className="share-header-section">
						<div className="profile-header">
							<div className="profile-header__content">
								<div className="profile-avatar">
									<div className="avatar-ring">
										<img
											src={`https://mc-heads.net/avatar/${user.minecraftNick || user.minecraft_nick}/240`}
											alt="Avatar"
											className="avatar-image"
										/>
									</div>
									<div className="avatar-status online"></div>
								</div>

								<div className="profile-info">
									<div className="profile-info-content">
										<div className="profile-info-top">
											<h1 className="profile-name">{user.minecraftNick || user.minecraft_nick}</h1>
											<div className="profile-role">
												<span className="role-badge">{user.role || "Гравець"}</span>
											</div>
										</div>
										<div className="profile-meta">
											<div className="meta-item">
												<span className="meta-icon">📅</span>
												<span>Зареєстрований {new Date(user.registered_at * 1000).toLocaleDateString()}</span>
											</div>
											<div className="meta-item">
												<span className="meta-icon">💬</span>
												<span>Повідомлень сьогодні: <strong>{user.messages_count}</strong></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Блок 1: Баланс та Статистика */}
					<div className="share-game-stats-row">
						<ProfileBalance user={user} />
					</div>
					<div className="share-game-stats-row">
						<ProfileGameStats user={user} />
					</div>

					{/* Блок 2: Ігрова статистика (якщо є) */}
					{user.plan_data_available && (
						<div className="share-game-stats-row">
							<ProfileStats user={user} />
						</div>
					)}

					{/* Блок 3: Футер з логотипом */}
					<div className="share-footer">
						<div className="footer-content">
							<div className="server-info">
								<span className="server-name">Forze World</span>
								<span className="server-ip">mine.forze.space</span>
							</div>
							<div className="footer-text">
								🏆 Найкращий Minecraft сервер!
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.profile-share-container {
					margin: 20px 0;
				}

				.share-controls {
					display: flex;
					gap: 12px;
					justify-content: center;
					margin-bottom: 20px;
				}

				.share-btn {
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 12px 24px;
					border: none;
					border-radius: 12px;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.3s ease;
					font-size: 14px;
				}

				.download-btn {
					background: linear-gradient(135deg, #4aedd9, rgba(74, 237, 217, 0.8));
					color: #012722;
					margin-bottom: 10px;
				}

				.telegram-btn {
					background: linear-gradient(135deg, #0088cc, #005fa3);
					color: white;
					margin-bottom: 10px;
				}

				.share-btn:hover:not(:disabled) {
					transform: translateY(-2px);
					box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
				}

				.share-btn:disabled {
					opacity: 0.7;
					cursor: not-allowed;
					transform: none;
				}

				/* 📐 Контейнер 1920x2560 */
				.profile-share-capture {
					position: absolute;
					top: -9999px;
					left: -9999px;
					width: 1024px;
					height: 1868px;
					z-index: -1;
					transform: scale(0.1);
					transform-origin: top left;
				}

				.profile-share-capture.generating {
					position: fixed;
					top: 0;
					left: 0;
					z-index: 9999;
					transform: scale(1);
				}

				.share-wrapper {
					width: 100%;
					height: 100%;
					background: linear-gradient(45deg, #022722, #145e53);
					padding: 50px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					gap: 40px;
				}

				/* 🎯 Хедер профілю */
				.share-header-section {
					flex-shrink: 0;
				}

				.share-header-section .profile-header {
					padding: 30px 0;
				}

				.share-header-section .profile-header__content {
					gap: 50px;
					justify-content: flex-start;
				}

				.share-header-section .profile-avatar .avatar-ring {
					width: 200px;
					height: 200px;
					padding: 6px;
				}

				.share-header-section .avatar-status {
					width: 30px;
					height: 30px;
					border-width: 4px;
					bottom: 10px;
					right: 15px;
				}

				.share-header-section .profile-name {
					font-size: 4rem;
					margin-bottom: 1.5rem;
					background: none !important;
					-webkit-background-clip: unset !important;
					-webkit-text-fill-color: unset !important;
					background-clip: unset !important;
					color: #ffffff !important;
				}

				.share-header-section .role-badge {
					padding: 0.8rem 1.6rem;
					font-size: 1.4rem;
					border-radius: 30px;
				}

				.share-header-section .meta-item {
					font-size: 1.6rem;
					gap: 0.8rem;
				}

				.share-header-section .meta-icon {
					font-size: 1.4rem;
				}

				/* 📊 Блок 1: Баланс + Статистика */
				.share-content-row {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 40px;
					flex-shrink: 0;
				}

				.share-balance-column,
				.share-stats-column {
					display: flex;
					flex-direction: column;
				}

				/* 🎮 Блок 2: Ігрова статистика */
				.share-game-stats-row {
					flex-shrink: 0;
				}

				/* 📋 Карточки - збільшені розміри */
				.share-wrapper :global(.profile-card) {
					padding: 35px;
					font-size: 1.5em;
					border-radius: 20px;
					border-width: 2px;
				}

				.share-wrapper :global(.card-title) {
					font-size: 2.2rem;
					gap: 0.8rem;
					margin-bottom: 2rem;
				}

				.share-wrapper :global(.card-icon) {
					font-size: 2rem;
				}

				/* 💰 Баланс */
				.share-wrapper :global(.balance-content) {
					gap: 1.5rem;
				}

				.share-wrapper :global(.balance-item) {
					padding: 1.8rem;
					border-radius: 15px;
					border-left-width: 6px;
				}

				.share-wrapper :global(.balance-label) {
					font-size: 1.3rem;
				}

				.share-wrapper :global(.balance-value) {
					font-size: 2.8rem;
				}

				.share-wrapper :global(.balance-icon) {
					height: 50px;
				}

				.share-wrapper :global(.balance-icon img) {
					width: 50px;
					height: 50px;
				}

				/* 📊 Статистика */
				.share-wrapper :global(.stats-grid) {
					gap: 1.5rem;
					margin-bottom: 1.5rem;
				}

				.share-wrapper :global(.stat-item) {
					gap: 1.2rem;
					padding: 1.8rem;
					border-radius: 15px;
					border-width: 2px;
					border-left-width: 4px;
				}

				.share-wrapper :global(.stat-icon) {
					font-size: 2.2rem;
				}

				.share-wrapper :global(.stat-value) {
					font-size: 2rem;
				}

				.share-wrapper :global(.stat-label) {
					font-size: 1.4rem;
				}

				/* 🎯 Ігрова статистика */
				.share-wrapper :global(.activity-header) {
					margin-bottom: 0.8rem;
				}

				.share-wrapper :global(.activity-badge) {
					padding: 0.8rem 1.6rem;
					border-radius: 25px;
					font-size: 1.2rem;
				}

				.share-wrapper :global(.progress-bar) {
					height: 12px;
					border-radius: 6px;
				}

				.share-wrapper :global(.progress-percentage) {
					font-size: 1.4rem;
					min-width: 60px;
				}

				.share-wrapper :global(.kd-ratio),
				.share-wrapper :global(.session-average) {
					padding: 1.8rem;
					border-radius: 15px;
					border-width: 2px;
					margin-bottom: 1.5rem;
				}

				.share-wrapper :global(.ratio-header),
				.share-wrapper :global(.session-header) {
					gap: 0.8rem;
					margin-bottom: 0.8rem;
				}

				.share-wrapper :global(.ratio-icon),
				.share-wrapper :global(.session-icon) {
					font-size: 1.8rem;
				}

				.share-wrapper :global(.ratio-label),
				.share-wrapper :global(.session-label) {
					font-size: 1.4rem;
				}

				.share-wrapper :global(.ratio-number),
				.share-wrapper :global(.session-value) {
					font-size: 2rem;
				}

				.share-wrapper :global(.ratio-breakdown) {
					font-size: 1.4rem;
				}

				/* 🏷️ Знижка */
				.share-wrapper :global(.discount-section) {
					padding: 1.8rem;
					border-radius: 15px;
					border-width: 2px;
				}

				.share-wrapper :global(.discount-progress) {
					gap: 1.2rem;
				}

				.share-wrapper :global(.current-discount) {
					font-size: 1.8rem;
				}

				.share-wrapper :global(.max-discount) {
					font-size: 1.4rem;
				}

				/* 🏆 Футер */
				.share-footer {
					border-top: 3px solid rgba(74, 237, 217, 0.3);
					padding-top: 30px;
					margin-top: auto;
					flex-shrink: 0;
				}

				.footer-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.server-info {
					display: flex;
					flex-direction: column;
					gap: 8px;
				}

				.server-name {
					font-size: 2.6rem;
					font-weight: 700;
					color: #4aedd9;
				}

				.server-ip {
					font-size: 2rem;
					color: rgba(255, 255, 255, 0.8);
				}

				.footer-text {
					font-size: 1.8rem;
					font-weight: 600;
					color: #FBFF00;
				}

				@media (max-width: 768px) {
					.share-controls {
						flex-direction: column;
						gap: 8px;
					}
					
					.share-btn {
						width: 100%;
						justify-content: center;
					}
				}
			`}</style>
		</div>
	);
};

export default ProfileShareGenerator;
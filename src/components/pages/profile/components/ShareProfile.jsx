
import { useState, useRef } from 'react';
import { Download, Send } from 'lucide-react';
import html2canvas from 'html2canvas';
import "../styles/ShareProfile.scss"

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
			element.style.position = 'static';
			element.style.top = '-99999px';
			element.style.left = '-99999px';
			element.style.zIndex = '1';
			element.style.transform = 'scale(1)';

			await new Promise(resolve => setTimeout(resolve, 500)); // Даємо час відрендеритись

			const canvas = await html2canvas(element, {
				backgroundColor: '#022722',
				scale: 1.5, // Для кращої якості
				width: 1024,
				height: 1854,
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
					const statsText = `🎮 Мій профіль на Forze World!\n\n⚡ Приєднуйся: mine.forze.space`;

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
		<div className="profile-share-container ShareProfile">
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

			<div className="ShareProfile-box">
				{/* Прихований контейнер для генерації картинки */}
				<div
					ref={shareRef}
					className={`profile-share-capture ${isGenerating ? 'generating' : ''}`}
				>
					<div className="share-wrapper">
						<div className="share-card-container">
							{/* Хедер профілю */}
							<div className="share-header">
								<div className="share-avatar">
									<div className="share-avatar-ring">
										<img
											src={`https://mc-heads.net/avatar/${user.minecraftNick || user.minecraft_nick}/160`}
											alt="Avatar"
											className="share-avatar-image"
										/>
									</div>
									<div className="share-avatar-status-online"></div>
								</div>

								<div className="share-info">

									<div className="share-name">{(user.minecraftNick || user.minecraft_nick)?.length > 16
										? `${(user.minecraftNick || user.minecraft_nick).slice(0, 16)}...`
										: (user.minecraftNick || user.minecraft_nick)
									}</div>
									<div className="share-role">
										<span className="share-role-badge">{user.role || "Гравець"}</span>
									</div>
									<div className="share-meta">
										<div className="share-meta-item">
											<span className="share-meta-icon">📅</span>
											<span className="share-meta-text">Зареєстрований {new Date(user.registered_at * 1000).toLocaleDateString()}</span>
										</div>
										<div className="share-meta-item">
											<span className="share-meta-icon">💬</span>
											<span className="share-meta-text">Повідомлень сьогодні: <strong>{user.messages_count}</strong></span>
										</div>
									</div>
								</div>
							</div>

							{/* Секція балансу */}
							<div className="share-balance-section">
								<div className="share-section-header">
									<span className="share-section-icon">💰</span>
									<span className="share-section-title">Баланс</span>
								</div>

								<div className="share-balance-items">
									{/* Ігрова валюта */}
									<div className="share-balance-item share-game-balance">
										<div className="share-balance-info">
											<span className="share-balance-label">Ігрова валюта</span>
											<span className="share-balance-value">{(user.game_balance || 0).toLocaleString()}</span>
										</div>
										<div className="share-balance-icon-wrapper">
											<span className="share-balance-currency-icon">
												<img src="/public/assets/icons/GFC.svg" alt="GFC" width={64} height={64} />
											</span>
										</div>
									</div>

									{/* Донат баланс */}
									<div className="share-balance-item share-donate-balance">
										<div className="share-balance-info">
											<span className="share-balance-label">Донат баланс</span>
											<span className="share-balance-value">{(user.donate_balance || 0).toLocaleString()}</span>
										</div>
										<div className="share-balance-icon-wrapper">
											<span className="share-balance-currency-icon">
												<img src="/public/assets/icons/DFC.svg" alt="DFC" width={64} height={64} />
											</span>
										</div>
									</div>
								</div>

								{/* Персональна знижка */}
								{user.discount_percent > 0 && (
									<div className="share-discount-section">
										<div className="share-discount-header">
											<span className="share-discount-icon">🏷️</span>
											<span className="share-discount-label">Персональна знижка</span>
										</div>
										<div className="share-discount-progress">
											<div className="share-progress-bar">
												<div
													className="share-progress-fill"
													style={{ width: `${(user.discount_percent / 40) * 100}%` }}
												></div>
											</div>
											<div className="share-progress-text">
												<span className="share-current-discount">{user.discount_percent}%</span>
												<span className="share-max-discount">/ 40%</span>
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Ігрова статистика */}
							{user.plan_data_available && (
								<div className="share-game-stats-section">
									<div className="share-section-header">
										<span className="share-section-icon">🎯</span>
										<span className="share-section-title">Ігрова статистика</span>
									</div>

									{/* Рівень активності */}
									<div className="share-activity-level">
										<div className="share-activity-header">
											<span className="share-activity-label">Рівень активності</span>
											<span className="share-activity-badge">
												{user.total_sessions >= 400 ? "Легендарний" :
													user.total_sessions >= 200 ? "Експерт" :
														user.total_sessions >= 80 ? "Досвідчений" :
															user.total_sessions >= 20 ? "Новачок" : "Початківець"}
											</span>
										</div>
										<div className="share-activity-progress">
											<div className="share-progress-bar">
												<div
													className="share-progress-fill share-activity-progress-fill"
													style={{
														width: `${Math.min(
															user.total_sessions >= 400 ? 100 :
																user.total_sessions >= 200 ? (user.total_sessions / 400) * 100 :
																	user.total_sessions >= 80 ? (user.total_sessions / 200) * 100 :
																		user.total_sessions >= 20 ? (user.total_sessions / 80) * 100 :
																			(user.total_sessions / 20) * 100, 100
														)}%`
													}}
												></div>
											</div>
											<span className="share-progress-percentage">
												{Math.round(
													user.total_sessions >= 400 ? 100 :
														user.total_sessions >= 200 ? (user.total_sessions / 400) * 100 :
															user.total_sessions >= 80 ? (user.total_sessions / 200) * 100 :
																user.total_sessions >= 20 ? (user.total_sessions / 80) * 100 :
																	(user.total_sessions / 20) * 100
												)}%
											</span>
										</div>
									</div>

									<div className="share-second-wrapper">
										{/* K/D Ratio */}
										<div className="share-kd-ratio">
											<div className="share-stat-header">
												<span className="share-stat-icon">⚔️</span>
												<span className="share-stat-label">Kill/Death Ratio</span>
											</div>
											<div className="share-stat-value-container">
												<span className="share-stat-number">{user.kd_ratio || '0.00'}</span>
												<span className="share-stat-breakdown">({user.total_mob_kills || 0} / {user.total_deaths || 0})</span>
											</div>
										</div>

										{/* Середня сесія */}
										<div className="share-session-average">
											<div className="share-stat-header">
												<span className="share-stat-icon">⏱️</span>
												<span className="share-stat-label">Середня сесія</span>
											</div>
											<div className="share-stat-value">
												{user.total_sessions > 0
													? `${((user.total_playtime_hours || 0) / user.total_sessions).toFixed(1)} год`
													: '0.5 год'
												}
											</div>
										</div>

										{/* Статус гравця */}
										<div className="share-player-status">
											<div className="share-stat-header">
												<span className="share-stat-icon">📈</span>
												<span className="share-stat-label">Статус гравця</span>
											</div>
											<div className="share-stat-value">
												{user.total_playtime_hours > 200 ? "Хардкорний гравець" :
													user.total_playtime_hours > 100 ? "Активний гравець" :
														user.total_playtime_hours > 20 ? "Регулярний гравець" : "Новий гравець"}
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Основна статистика */}
							{user.plan_data_available && (
								<div className="share-main-stats-section">
									<div className="share-section-header">
										<span className="share-section-icon">📊</span>
										<span className="share-section-title">Статистика</span>
									</div>

									<div className="share-stats-grid">
										{/* Час гри */}
										<div className="share-stat-item share-playtime-stat">
											<div className="share-stat-icon-wrapper">
												<span className="share-stat-emoji">🎮</span>
											</div>
											<div className="share-stat-content">
												<span className="share-stat-value">
													{user.total_playtime_hours
														? user.total_playtime_hours < 1
															? `${Math.round(user.total_playtime_hours * 60)} хв`
															: user.total_playtime_hours < 24
																? `${user.total_playtime_hours.toFixed(1)} год`
																: `${Math.floor(user.total_playtime_hours / 24)} дн`
														: "7.4 год"
													}
												</span>
												<span className="share-stat-label">Загальний час гри</span>
											</div>
										</div>

										{/* Кількість сесій */}
										<div className="share-stat-item share-sessions-stat">
											<div className="share-stat-icon-wrapper">
												<span className="share-stat-emoji">🔄</span>
											</div>
											<div className="share-stat-content">
												<span className="share-stat-value">{user.total_sessions || 15}</span>
												<span className="share-stat-label">Кількість сесій</span>
											</div>
										</div>

										{/* Вбивства мобів */}
										<div className="share-stat-item share-kills-stat">
											<div className="share-stat-icon-wrapper">
												<span className="share-stat-emoji">⚔️</span>
											</div>
											<div className="share-stat-content">
												<span className="share-stat-value">{user.total_mob_kills || 0}</span>
												<span className="share-stat-label">Вбивств мобів</span>
											</div>
										</div>

										{/* Смерті */}
										<div className="share-stat-item share-deaths-stat">
											<div className="share-stat-icon-wrapper">
												<span className="share-stat-emoji">💀</span>
											</div>
											<div className="share-stat-content">
												<span className="share-stat-value">{user.total_deaths || 2}</span>
												<span className="share-stat-label">Смертей</span>
											</div>
										</div>

										{/* Улюблений світ */}
										<div className="share-stat-item share-world-stat">
											<div className="share-stat-icon-wrapper">
												<span className="share-stat-emoji">🌍</span>
											</div>
											<div className="share-stat-content">
												<span className="share-stat-value">{user.most_played_world || "Spawn"}</span>
												<span className="share-stat-label">Улюблений світ</span>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Футер */}
							<div className="share-footer">
								<div className="share-server-info">
									<div className="share-server-name">Forze World</div>
									<div className="share-server-ip">mine.forze.space</div>
								</div>
								<div className="share-server-slogan">
									<span className="share-trophy-icon">🏆</span>
									<span className="share-slogan-text">Найкращий Minecraft сервер!</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default ProfileShareGenerator;
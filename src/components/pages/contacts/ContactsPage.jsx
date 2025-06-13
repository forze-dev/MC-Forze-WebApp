import React from 'react';
import SEOHelmet from '../../common/SEOHelmet/SEOHelmet';
import './styles/contacts.scss';

const ContactsPage = () => {
	return (
		<>
			<SEOHelmet
				title="Контакти - Minecraft сервер Forze Space"
				description="Контактна інформація Minecraft сервера Forze Space. Офіційні реквізити, адреса, телефон та email для зв'язку з адміністрацією."
				canonical="https://forze.space/contacts"
			/>

			<main className="contacts-page">
				<div className="container">
					<div className="contacts-header">
						<h1>Контактна інформація</h1>
						<p className="contacts-subtitle">
							Офіційні дані для зв'язку з адміністрацією Minecraft сервера Forze Space
						</p>
					</div>

					<div className="contacts-content">
						{/* Основна контактна інформація */}
						<div className="contacts-card">
							<div className="card-header">
								<h2 className="card-title">
									<span className="card-icon">🏢</span>
									Реквізити організації
								</h2>
							</div>

							<div className="company-details">
								<div className="detail-item">
									<span className="detail-label">Повне найменування:</span>
									<span className="detail-value">
										Фізична особа-підприємець Мелай Даяна Дмитрівна
									</span>
								</div>

								<div className="detail-item">
									<span className="detail-label">ІПН:</span>
									<span className="detail-value">3788309149</span>
								</div>

								<div className="detail-item">
									<span className="detail-label">Група платника ПДВ:</span>
									<span className="detail-value">2 група</span>
								</div>

								<div className="detail-item">
									<span className="detail-label">Юридична адреса:</span>
									<span className="detail-value">
										13638, Житомирська область, Бердичівський район,
										Ружинська територіальна громада, село Йосипівка,
										вулиця Грушевського, будинок 28
									</span>
								</div>
							</div>
						</div>

						{/* Контакти для зв'язку */}
						<div className="contacts-card">
							<div className="card-header">
								<h2 className="card-title">
									<span className="card-icon">📞</span>
									Контакти для зв'язку
								</h2>
							</div>

							<div className="contact-methods">
								<div className="contact-item">
									<div className="contact-icon">📧</div>
									<div className="contact-info">
										<span className="contact-label">Email для підтримки:</span>
										<a href="mailto:support@forze.space" className="contact-value">
											support@forze.space
										</a>
									</div>
								</div>

								<div className="contact-item">
									<div className="contact-icon">📱</div>
									<div className="contact-info">
										<span className="contact-label">Телефон:</span>
										<a href="tel:+380980275819" className="contact-value">
											+38 098 027 58 19
										</a>
									</div>
								</div>

								<div className="contact-item">
									<div className="contact-icon">🕐</div>
									<div className="contact-info">
										<span className="contact-label">Години роботи підтримки:</span>
										<span className="contact-value">
											Понеділок - П'ятниця: 09:00 - 16:00 (UTC+2)
										</span>
									</div>
								</div>

								<div className="contact-item">
									<div className="contact-icon">🎮</div>
									<div className="contact-info">
										<span className="contact-label">IP адреса сервера:</span>
										<span className="contact-value">mine.forze.space</span>
									</div>
								</div>
							</div>
						</div>

						{/* Додаткові контакти */}
						<div className="contacts-card">
							<div className="card-header">
								<h2 className="card-title">
									<span className="card-icon">💬</span>
									Додаткові способи зв'язку
								</h2>
							</div>

							<div className="additional-contacts">
								<div className="social-item">
									<span className="social-icon">📱</span>
									<span className="social-label">Telegram бот:</span>
									<a
										href="https://t.me/forze_space_bot"
										target="_blank"
										rel="noopener noreferrer"
										className="social-link"
									>
										@forze_space_bot
									</a>
								</div>

								<div className="social-item">
									<span className="social-icon">🌐</span>
									<span className="social-label">Веб-сайт:</span>
									<a
										href="https://forze.space"
										className="social-link"
									>
										forze.space
									</a>
								</div>
							</div>
						</div>

						{/* Важлива інформація */}
						<div className="contacts-notice">
							<div className="notice-content">
								<h3>📋 Важлива інформація</h3>
								<ul>
									<li>
										<strong>Технічна підтримка:</strong> Всі питання щодо роботи сервера,
										відновлення доступу та технічних проблем.
									</li>
									<li>
										<strong>Питання оплати:</strong> Повернення коштів, проблеми з донатом,
										активація VIP-статусів.
									</li>
									<li>
										<strong>Скарги та пропозиції:</strong> Повідомлення про порушення правил,
										пропозиції щодо покращення сервера.
									</li>
									<li>
										<strong>Час відповіді:</strong> Зазвичай відповідаємо протягом 24 годин
										у робочі дні.
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default ContactsPage;
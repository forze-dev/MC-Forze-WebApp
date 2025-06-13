import React from 'react';
import SEOHelmet from '../../common/SEOHelmet/SEOHelmet';
import './styles/privacy-policy.scss';

const PrivacyPolicyPage = () => {
	return (
		<>
			<SEOHelmet
				title="Політика конфіденційності - Minecraft сервер Forze Space"
				description="Політика конфіденційності та захисту персональних даних користувачів Minecraft сервера Forze Space. Права користувачів та обробка даних."
				canonical="https://forze.space/privacy-policy"
			/>

			<main className="privacy-policy-page">
				<div className="container">
					<div className="policy-header">
						<h1>Політика конфіденційності</h1>
						<p className="policy-subtitle">
							Захист персональних даних та конфіденційність користувачів Minecraft сервера Forze Space
						</p>
						<div className="last-updated">
							Останнє оновлення: {new Date().toLocaleDateString('uk-UA')}
						</div>
					</div>

					<div className="policy-content">

						{/* 1. Загальні положення */}
						<section className="privacy-section">
							<h2 className="section-title">
								<span className="section-number">1</span>
								Загальні положення
							</h2>
							<div className="section-content">
								<p>
									Ця Політика конфіденційності описує, як фізична особа-підприємець
									<strong> Мелай Даяна Дмитрівна</strong> (ІПН: 3788309149) збирає,
									використовує, зберігає та захищає персональні дані користувачів
									Minecraft сервера <strong>Forze Space</strong>.
								</p>
								<p>
									Використовуючи наші послуги, ви погоджуєтесь з умовами цієї політики
									та надаєте згоду на обробку ваших персональних даних відповідно до
									законодавства України.
								</p>
								<div className="important-notice">
									<h3>🔒 Наші принципи захисту даних</h3>
									<ul>
										<li>Збираємо тільки необхідні для роботи сервера дані</li>
										<li>Ніколи не продаємо персональні дані третім особам</li>
										<li>Використовуємо сучасні методи захисту інформації</li>
										<li>Поважаємо права користувачів на приватність</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 2. Які дані ми збираємо */}
						<section className="privacy-section data-collection">
							<h2 className="section-title">
								<span className="section-number">2</span>
								Які персональні дані ми збираємо
							</h2>
							<div className="section-content">
								<p>
									Для надання якісних послуг ми збираємо наступні типи персональних даних:
								</p>

								<div className="data-categories">

									<div className="data-category">
										<h4>🎮 Ігрові дані</h4>
										<ul>
											<li><strong>Minecraft нікнейм</strong> — для ідентифікації в грі</li>
											<li><strong>UUID Minecraft</strong> — унікальний ідентифікатор акаунту</li>
											<li><strong>Статистика гри:</strong> час гри, кількість сесій, досягнення</li>
											<li><strong>Ігрова активність:</strong> улюблений світ, кількість смертей та вбивств</li>
											<li><strong>Внутрішньоігровий прогрес</strong> та баланс</li>
										</ul>
									</div>

									<div className="data-category">
										<h4>📱 Telegram дані</h4>
										<ul>
											<li><strong>Telegram ID</strong> — для прив'язки до бот-системи</li>
											<li><strong>Telegram username</strong> (якщо доступний)</li>
											<li><strong>Ім'я та прізвище</strong> з Telegram профілю</li>
											<li><strong>Мова інтерфейсу</strong> Telegram</li>
										</ul>
										<div className="data-note">
											<p><strong>Примітка:</strong> Реєстрація здійснюється виключно через Telegram бот</p>
										</div>
									</div>

									<div className="data-category">
										<h4>🌐 Технічні дані</h4>
										<ul>
											<li><strong>IP адреса</strong> — для безпеки та логування входів</li>
											<li><strong>Час підключення</strong> та відключення від сервера</li>
											<li><strong>Версія Minecraft клієнта</strong></li>
											<li><strong>Лог дій</strong> для розслідування порушень</li>
										</ul>
									</div>

									<div className="data-category">
										<h4>💳 Платіжні дані</h4>
										<ul>
											<li><strong>Сума платежу</strong> та дата транзакції</li>
											<li><strong>Статус платежу</strong> (успішний/неуспішний)</li>
											<li><strong>ID транзакції</strong> для службових цілей</li>
										</ul>
										<div className="data-note warning">
											<p>
												<strong>⚠️ Важливо:</strong> Банківські дані (номери карток, CVV)
												зберігаються виключно в захищеній системі WayForPay.
												Ми НЕ маємо доступу до цих даних.
											</p>
										</div>
									</div>

								</div>
							</div>
						</section>

						{/* 3. Для чого ми використовуємо дані */}
						<section className="privacy-section purpose">
							<h2 className="section-title">
								<span className="section-number">3</span>
								Цілі обробки персональних даних
							</h2>
							<div className="section-content">
								<p>
									Зібрані персональні дані використовуються виключно для наступних цілей:
								</p>

								<div className="purpose-grid">

									<div className="purpose-item">
										<span className="purpose-icon">🎯</span>
										<div className="purpose-content">
											<h4>Надання ігрових послуг</h4>
											<ul>
												<li>Ідентифікація гравців на сервері</li>
												<li>Збереження ігрового прогресу</li>
												<li>Відображення статистики</li>
												<li>Налаштування ігрового досвіду</li>
											</ul>
										</div>
									</div>

									<div className="purpose-item">
										<span className="purpose-icon">🔐</span>
										<div className="purpose-content">
											<h4>Безпека та захист</h4>
											<ul>
												<li>Запобігання зловживанням та шахрайству</li>
												<li>Виявлення та блокування порушників</li>
												<li>Розслідування інцидентів</li>
												<li>Антифрод моніторинг</li>
											</ul>
										</div>
									</div>

									<div className="purpose-item">
										<span className="purpose-icon">💬</span>
										<div className="purpose-content">
											<h4>Технічна підтримка</h4>
											<ul>
												<li>Відповіді на запити користувачів</li>
												<li>Вирішення технічних проблем</li>
												<li>Відновлення доступу до акаунтів</li>
												<li>Консультації щодо функцій сервера</li>
											</ul>
										</div>
									</div>

									<div className="purpose-item">
										<span className="purpose-icon">💳</span>
										<div className="purpose-content">
											<h4>Обробка платежів</h4>
											<ul>
												<li>Активація VIP-статусів та бонусів</li>
												<li>Ведення обліку транзакцій</li>
												<li>Розгляд запитів щодо повернення</li>
												<li>Фінансова звітність</li>
											</ul>
										</div>
									</div>

									<div className="purpose-item">
										<span className="purpose-icon">📊</span>
										<div className="purpose-content">
											<h4>Аналітика та покращення</h4>
											<ul>
												<li>Аналіз використання сервера</li>
												<li>Оптимізація продуктивності</li>
												<li>Розробка нових функцій</li>
												<li>Покращення користувацького досвіду</li>
											</ul>
										</div>
									</div>

									<div className="purpose-item">
										<span className="purpose-icon">📢</span>
										<div className="purpose-content">
											<h4>Комунікація</h4>
											<ul>
												<li>Повідомлення про оновлення сервера</li>
												<li>Інформування про події та конкурси</li>
												<li>Надсилання важливих сповіщень</li>
												<li>Telegram бот взаємодія</li>
											</ul>
										</div>
									</div>

								</div>
							</div>
						</section>

						{/* 4. Правова підстава обробки */}
						<section className="privacy-section legal">
							<h2 className="section-title">
								<span className="section-number">4</span>
								Правова підстава обробки даних
							</h2>
							<div className="section-content">
								<p>
									Обробка персональних даних здійснюється на підставі:
								</p>

								<div className="legal-bases">
									<div className="legal-item">
										<h4>✅ Згода суб'єкта персональних даних</h4>
										<p>
											Використовуючи наші послуги та реєструючись через Telegram бот,
											ви надаєте добровільну згоду на обробку ваших персональних даних.
										</p>
									</div>

									<div className="legal-item">
										<h4>✅ Виконання договору</h4>
										<p>
											Обробка необхідна для надання ігрових послуг відповідно до
											Умов використання сервера Forze Space.
										</p>
									</div>

									<div className="legal-item">
										<h4>✅ Законні інтереси</h4>
										<p>
											Забезпечення безпеки сервера, запобігання шахрайству та
											підтримка стабільної роботи ігрового середовища.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* 5. Передача даних третім особам */}
						<section className="privacy-section sharing">
							<h2 className="section-title">
								<span className="section-number">5</span>
								Передача даних третім особам
							</h2>
							<div className="section-content">

								<div className="sharing-policy">
									<div className="no-sharing">
										<h3>🚫 Ми НІКОЛИ не передаємо дані:</h3>
										<ul>
											<li>Рекламним компаніям для маркетингу</li>
											<li>Брокерам даних або агрегаторам</li>
											<li>Іншим ігровим сервісам або конкурентам</li>
											<li>Будь-яким третім особам для комерційних цілей</li>
										</ul>
									</div>

									<div className="limited-sharing">
										<h3>✅ Обмежена передача даних:</h3>

										<div className="sharing-case">
											<h4>💳 WayForPay (платіжна система)</h4>
											<p>
												Для обробки платежів ми передаємо мінімально необхідні дані:
												суму платежу, ідентифікатор замовлення. WayForPay має власну
												політику конфіденційності та сертифікацію PCI DSS.
											</p>
										</div>

										<div className="sharing-case">
											<h4>📊 Аналітичні сервіси</h4>
											<p>
												<strong>Google Analytics:</strong> Анонімізовані дані про відвідування сайту<br />
												<strong>Microsoft Clarity:</strong> Аналіз користувацького досвіду на сайті
											</p>
											<div className="analytics-note">
												<p>
													<strong>Примітка:</strong> Ці сервіси не отримують персональні дані
													гравців та використовуються тільки для покращення сайту.
												</p>
											</div>
										</div>

										<div className="sharing-case">
											<h4>⚖️ Правоохоронні органи</h4>
											<p>
												Можемо передати дані на законну вимогу правоохоронних органів
												України у випадках кримінальних розслідувань.
											</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* 6. Зберігання та захист даних */}
						<section className="privacy-section security">
							<h2 className="section-title">
								<span className="section-number">6</span>
								Зберігання та захист персональних даних
							</h2>
							<div className="section-content">

								<div className="security-measures">
									<h3>🔐 Заходи безпеки</h3>
									<div className="security-grid">
										<div className="security-item">
											<h4>🖥️ Технічний захист</h4>
											<ul>
												<li>Шифрування даних при передачі (SSL/TLS)</li>
												<li>Захищені бази даних з обмеженим доступом</li>
												<li>Регулярні резервні копії</li>
												<li>Моніторинг безпеки 24/7</li>
											</ul>
										</div>

										<div className="security-item">
											<h4>👥 Організаційний захист</h4>
											<ul>
												<li>Доступ до даних тільки у авторизованого персоналу</li>
												<li>Навчання команди з питань конфіденційності</li>
												<li>Регулярний аудит системи безпеки</li>
												<li>Процедури реагування на інциденти</li>
											</ul>
										</div>
									</div>
								</div>

								<div className="data-retention">
									<h3>⏰ Терміни зберігання даних</h3>
									<div className="retention-timeline">

										<div className="retention-item">
											<span className="timeline-icon">🎮</span>
											<div className="timeline-content">
												<h4>Активні гравці</h4>
												<p>Дані зберігаються <strong>доки ви користуєтесь сервером</strong></p>
											</div>
										</div>

										<div className="retention-item">
											<span className="timeline-icon">😴</span>
											<div className="timeline-content">
												<h4>Неактивні гравці</h4>
												<p>Дані видаляються <strong>через 2 місяці</strong> після останнього входу в гру</p>
											</div>
										</div>

										<div className="retention-item">
											<span className="timeline-icon">🗑️</span>
											<div className="timeline-content">
												<h4>На вимогу користувача</h4>
												<p>Дані видаляються <strong>протягом 30 днів</strong> після запиту</p>
											</div>
										</div>

										<div className="retention-item">
											<span className="timeline-icon">💰</span>
											<div className="timeline-content">
												<h4>Фінансові записи</h4>
												<p>Зберігаються <strong>5 років</strong> відповідно до податкового законодавства</p>
											</div>
										</div>

									</div>
								</div>
							</div>
						</section>

						{/* 7. Cookies та веб-технології */}
						<section className="privacy-section cookies">
							<h2 className="section-title">
								<span className="section-number">7</span>
								Cookies та веб-технології
							</h2>
							<div className="section-content">
								<p>
									Наш веб-сайт використовує cookies та схожі технології для покращення функціональності:
								</p>

								<div className="cookies-types">

									<div className="cookie-type essential">
										<h4>🔐 Необхідні cookies</h4>
										<p><strong>Мета:</strong> Авторизація та базова функціональність сайту</p>
										<ul>
											<li><strong>auth_token</strong> — токен авторизації користувача</li>
											<li><strong>session_data</strong> — дані сесії для роботи сайту</li>
										</ul>
										<div className="cookie-note">
											<p>Ці cookies необхідні для роботи сайту і не можуть бути відключені.</p>
										</div>
									</div>

									<div className="cookie-type analytics">
										<h4>📊 Аналітичні cookies</h4>
										<p><strong>Мета:</strong> Покращення роботи сайту та користувацького досвіду</p>
										<ul>
											<li><strong>Google Analytics</strong> — аналіз відвідуваності сайту</li>
											<li><strong>Microsoft Clarity</strong> — аналіз поведінки користувачів</li>
										</ul>
										<div className="cookie-note">
											<p>Ці cookies допомагають нам зрозуміти, як користувачі взаємодіють з сайтом.</p>
										</div>
									</div>

								</div>

								<div className="cookies-control">
									<h4>⚙️ Управління cookies</h4>
									<p>
										Ви можете керувати cookies через налаштування вашого браузера.
										Однак, відключення необхідних cookies може вплинути на функціональність сайту.
									</p>
								</div>
							</div>
						</section>

						{/* 8. Права користувачів */}
						<section className="privacy-section rights">
							<h2 className="section-title">
								<span className="section-number">8</span>
								Ваші права щодо персональних даних
							</h2>
							<div className="section-content">
								<p>
									Відповідно до законодавства України, ви маєте наступні права:
								</p>

								<div className="rights-grid">

									<div className="right-item">
										<span className="right-icon">👁️</span>
										<div className="right-content">
											<h4>Право на доступ</h4>
											<p>Ви можете запитати, які ваші персональні дані ми обробляємо та з якою метою.</p>
											<div className="how-to">
												<strong>Як скористатися:</strong> Напишіть на support@forze.space
											</div>
										</div>
									</div>

									<div className="right-item">
										<span className="right-icon">✏️</span>
										<div className="right-content">
											<h4>Право на виправлення</h4>
											<p>Ви можете виправити неточні або неповні персональні дані.</p>
											<div className="how-to">
												<strong>Як скористатися:</strong> Через Telegram бот або звернення до підтримки
											</div>
										</div>
									</div>

									<div className="right-item">
										<span className="right-icon">🗑️</span>
										<div className="right-content">
											<h4>Право на видалення</h4>
											<p>Ви можете запросити видалення ваших персональних даних.</p>
											<div className="how-to">
												<strong>Як скористатися:</strong> Подайте запит на support@forze.space
											</div>
											<div className="limitation">
												<strong>Обмеження:</strong> Фінансові записи зберігаються 5 років за законом
											</div>
										</div>
									</div>

									<div className="right-item">
										<span className="right-icon">🚫</span>
										<div className="right-content">
											<h4>Право на обмеження</h4>
											<p>Ви можете обмежити обробку ваших персональних даних у певних випадках.</p>
											<div className="how-to">
												<strong>Як скористатися:</strong> Зверніться до support@forze.space з обґрунтуванням
											</div>
										</div>
									</div>

									<div className="right-item">
										<span className="right-icon">📦</span>
										<div className="right-content">
											<h4>Право на портативність</h4>
											<p>Ви можете отримати ваші дані у структурованому форматі.</p>
											<div className="how-to">
												<strong>Як скористатися:</strong> Запросіть експорт даних через підтримку
											</div>
										</div>
									</div>

									<div className="right-item">
										<span className="right-icon">❌</span>
										<div className="right-content">
											<h4>Право на заперечення</h4>
											<p>Ви можете заперечити проти обробки ваших даних у певних цілях.</p>
											<div className="how-to">
												<strong>Як скористатися:</strong> Напишіть мотивований запит на support@forze.space
											</div>
										</div>
									</div>

								</div>

								<div className="rights-process">
									<h4>⏱️ Терміни розгляду запитів</h4>
									<ul>
										<li><strong>Доступ до даних:</strong> до 30 днів</li>
										<li><strong>Виправлення даних:</strong> до 5 робочих днів</li>
										<li><strong>Видалення даних:</strong> до 30 днів</li>
										<li><strong>Експорт даних:</strong> до 14 днів</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 9. Міжнародні передачі */}
						<section className="privacy-section international">
							<h2 className="section-title">
								<span className="section-number">9</span>
								Міжнародні передачі даних
							</h2>
							<div className="section-content">
								<p>
									Деякі з наших технічних партнерів можуть обробляти дані за межами України:
								</p>

								<div className="international-transfers">
									<div className="transfer-item">
										<h4>🇺🇸 Google Analytics (США)</h4>
										<p>
											Аналітичні дані передаються до Google LLC у США. Google дотримується
											стандартів захисту даних та має сертифікацію Privacy Shield.
										</p>
									</div>

									<div className="transfer-item">
										<h4>🇺🇸 Microsoft Clarity (США)</h4>
										<p>
											Дані аналітики сайту обробляються Microsoft Corporation у США з
											дотриманням високих стандартів конфіденційності.
										</p>
									</div>
								</div>

								<div className="safeguards">
									<h4>🛡️ Гарантії захисту</h4>
									<ul>
										<li>Всі партнери мають сертифіковані системи захисту даних</li>
										<li>Передаються тільки анонімізовані або агреговані дані</li>
										<li>Діють стандартні контракти щодо захисту даних</li>
										<li>Регулярний моніторинг дотримання вимог</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 10. Зміни в політиці */}
						<section className="privacy-section changes">
							<h2 className="section-title">
								<span className="section-number">10</span>
								Зміни в політиці конфіденційності
							</h2>
							<div className="section-content">
								<p>
									Ми можемо оновлювати цю Політику конфіденційності у наступних випадках:
								</p>

								<ul>
									<li>Зміни в законодавстві України або міжнародному праві</li>
									<li>Додавання нових функцій або послуг</li>
									<li>Покращення методів захисту даних</li>
									<li>Зміни у технічній інфраструктурі</li>
								</ul>

								<div className="notification-process">
									<h4>📢 Як ми повідомляємо про зміни:</h4>
									<div className="notification-steps">
										<div className="notification-step">
											<span className="step-number">1</span>
											<div className="step-content">
												<h5>Попереднє повідомлення</h5>
												<p>За 14 днів до набрання чинності змін</p>
											</div>
										</div>

										<div className="notification-step">
											<span className="step-number">2</span>
											<div className="step-content">
												<h5>Повідомлення на сайті</h5>
												<p>Оновлення дати "Останнє оновлення" на цій сторінці</p>
											</div>
										</div>

										<div className="notification-step">
											<span className="step-number">3</span>
											<div className="step-content">
												<h5>Сповіщення користувачів</h5>
												<p>Через Telegram бот та на головній сторінці сайту</p>
											</div>
										</div>
									</div>
								</div>

								<div className="continued-use">
									<p>
										<strong>Продовження користування</strong> нашими послугами після оновлення
										політики означає ваше погодження з новими умовами.
									</p>
								</div>
							</div>
						</section>

						{/* 11. Контактна інформація */}
						<section className="privacy-section contact">
							<h2 className="section-title">
								<span className="section-number">11</span>
								Контакти з питань конфіденційності
							</h2>
							<div className="section-content">
								<p>
									З усіх питань, що стосуються обробки персональних даних та конфіденційності,
									ви можете звертатися:
								</p>

								<div className="contact-grid">
									<div className="contact-card">
										<h4>📧 Email підтримка</h4>
										<p><a href="mailto:support@forze.space">support@forze.space</a></p>
										<p><strong>Тема листа:</strong> "Питання конфіденційності"</p>
										<p><strong>Час відповіді:</strong> До 24 годин</p>
									</div>

									<div className="contact-card">
										<h4>📱 Телефон</h4>
										<p><a href="tel:+380980275819">+38 098 027 58 19</a></p>
										<p><strong>Години роботи:</strong> Пн-Пт 09:00-16:00</p>
										<p><strong>Часовий пояс:</strong> UTC+2 (Київ)</p>
									</div>

									<div className="contact-card">
										<h4>🏢 Контролер даних</h4>
										<p>ФОП Мелай Даяна Дмитрівна</p>
										<p><strong>ІПН:</strong> 3788309149</p>
										<p><strong>Адреса:</strong> с. Йосипівка, Житомирська обл.</p>
									</div>

									<div className="contact-card">
										<h4>⚖️ Регуляторні органи</h4>
										<p>Уповноважений ВР України з прав людини</p>
										<p><strong>Сайт:</strong> ombudsman.gov.ua</p>
										<p><strong>Право скарги:</strong> У разі порушення ваших прав</p>
									</div>
								</div>

								<div className="response-commitment">
									<h4>⏱️ Наші зобов'язання щодо відповідей</h4>
									<ul>
										<li><strong>Загальні питання:</strong> Відповідь протягом 24 годин</li>
										<li><strong>Запити на доступ/видалення:</strong> Розгляд до 30 днів</li>
										<li><strong>Екстрені випадки:</strong> Негайна реакція при порушеннях безпеки</li>
										<li><strong>Складні питання:</strong> Письмова відповідь з детальним поясненням</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 12. Заключні положення */}
						<section className="privacy-section">
							<h2 className="section-title">
								<span className="section-number">12</span>
								Заключні положення
							</h2>
							<div className="section-content">
								<div className="final-statements">
									<ul>
										<li>
											Ця Політика конфіденційності є невід'ємною частиною Умов використання
											сервера Forze Space.
										</li>
										<li>
											У разі конфлікту між цією політикою та іншими документами,
											пріоритет має ця Політика конфіденційності.
										</li>
										<li>
											Політика розроблена відповідно до Закону України "Про захист персональних даних"
											та інших чинних нормативних актів.
										</li>
										<li>
											Якщо будь-яке положення цієї політики визнано недійсним,
											решта положень залишаються в силі.
										</li>
										<li>
											Ми цінуємо вашу довіру та зобов'язуємося захищати ваші персональні дані
											на найвищому рівні! 🔒
										</li>
									</ul>
								</div>

								<div className="trust-statement">
									<h4>🤝 Наше зобов'язання перед вами</h4>
									<p>
										Команда Forze Space розуміє важливість конфіденційності та приватності.
										Ми постійно працюємо над покращенням захисту ваших даних та прозорістю
										наших процесів. Ваша довіра — це основа нашої спільноти!
									</p>
								</div>

								<div className="additional-resources">
									<h4>📚 Додаткові ресурси</h4>
									<ul>
										<li><a href="/terms">Умови використання</a> — повні правила сервера</li>
										<li><a href="/refund-policy">Політика повернення</a> — умови повернення коштів</li>
										<li><a href="/contacts">Контакти</a> — всі способи зв'язку з нами</li>
										<li><a href="https://t.me/forze_space_bot">Telegram бот</a> — реєстрація та підтримка</li>
									</ul>
								</div>
							</div>
						</section>

					</div>
				</div>
			</main>
		</>
	);
};

export default PrivacyPolicyPage;
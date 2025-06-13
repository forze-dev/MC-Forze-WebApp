import React from 'react';
import SEOHelmet from '../../common/SEOHelmet/SEOHelmet';
import './styles/terms.scss';

const TermsPage = () => {
	return (
		<>
			<SEOHelmet
				title="Умови використання - Minecraft сервер Forze Space"
				description="Правила та умови використання Minecraft сервера Forze Space. Способи оплати, терміни надання послуг, правила поведінки та технічні вимоги."
				canonical="https://forze.space/terms"
			/>

			<main className="terms-page">
				<div className="container">
					<div className="terms-header">
						<h1>Умови використання</h1>
						<p className="terms-subtitle">
							Правила та умови користування послугами Minecraft сервера Forze Space
						</p>
						<div className="last-updated">
							Останнє оновлення: {new Date().toLocaleDateString('uk-UA')}
						</div>
					</div>

					<div className="terms-content">

						{/* 1. Загальні положення */}
						<section className="terms-section">
							<h2 className="section-title">
								<span className="section-number">1</span>
								Загальні положення
							</h2>
							<div className="section-content">
								<p>
									Ці Умови використання (далі — "Умови") регулюють користування
									послугами Minecraft сервера <strong>Forze Space</strong>, що надаються
									фізичною особою-підприємцем Мелай Даяна Дмитрівна (ІПН: 3788309149).
								</p>
								<p>
									Використовуючи наш сервер, веб-сайт або систему донату, ви автоматично
									погоджуєтесь з усіма умовами, викладеними в цьому документі.
								</p>
								<div className="important-notice">
									<h3>📢 Важливо</h3>
									<ul>
										<li>Якщо ви не погоджуєтесь з умовами — не використовуйте наші послуги</li>
										<li>Умови можуть змінюватися з обов'язковим повідомленням користувачів</li>
										<li>Користувачі молодше 18 років повинні отримати згоду батьків</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 2. Опис послуг */}
						<section className="terms-section highlight">
							<h2 className="section-title">
								<span className="section-number">2</span>
								Опис наданих послуг
							</h2>
							<div className="section-content">
								<p>
									<strong>Forze Space</strong> — це Minecraft сервер, що надає ігрові послуги
									та можливості для спільної гри в віртуальному середовищі.
								</p>

								<div className="service-categories">
									<div className="service-item">
										<h4>🎮 Основні ігрові послуги</h4>
										<ul>
											<li>Доступ до Minecraft сервера та ігрового світу</li>
											<li>Можливість будівництва, видобутку ресурсів та спільної гри</li>
											<li>Участь у серверних подіях, квестах та міні-іграх</li>
											<li>Система внутрішньосерверної валюти та економіки</li>
											<li>Технічна підтримка та модерація</li>
										</ul>
									</div>

									<div className="service-item">
										<h4>👑 VIP-послуги та бонуси за підтримку</h4>
										<ul>
											<li>Спеціальні ролі та статуси на сервері</li>
											<li>Додатковий функціонал та можливості</li>
											<li>Ексклюзивні ігрові предмети та ресурси</li>
											<li>Збільшені ліміти та привілеї</li>
											<li>Пріоритетна технічна підтримка</li>
										</ul>
									</div>

									<div className="service-item">
										<h4>🌐 Додаткові послуги</h4>
										<ul>
											<li>Веб-сайт з профілем гравця та статистикою</li>
											<li>Система підтримки проєкту (донат)</li>
											<li>Спільнота в соціальних мережах</li>
											<li>Регулярні оновлення та нові функції</li>
										</ul>
									</div>
								</div>
							</div>
						</section>

						{/* 3. Технічні характеристики */}
						<section className="terms-section technical">
							<h2 className="section-title">
								<span className="section-number">3</span>
								Технічні характеристики та вимоги
							</h2>
							<div className="section-content">

								<div className="tech-grid">
									<div className="tech-item">
										<h4>🖥️ Системні вимоги</h4>
										<ul>
											<li><strong>Minecraft Java Edition</strong> версії 1.16 - 1.21.4</li>
											<li>Стабільне підключення до Інтернету</li>
											<li>Мінімум 2 ГБ оперативної пам'яті для комфортної гри</li>
										</ul>
									</div>

									<div className="tech-item">
										<h4>⏱️ Час роботи сервера</h4>
										<ul>
											<li><strong>Uptime:</strong> 99% часу (цілодобово)</li>
											<li><strong>Технічні роботи:</strong> 1 раз на місяць протягом 2-3 годин</li>
											<li>Попередження про технічні роботи за 24 години</li>
										</ul>
									</div>

									<div className="tech-item">
										<h4>🌍 Географічна доступність</h4>
										<ul>
											<li><strong>Ігровий доступ:</strong> Україна та весь світ</li>
											<li><strong>Система оплати:</strong> Тільки для резидентів України</li>
											<li><strong>Валюта оплати:</strong> Українська гривня (грн)</li>
										</ul>
									</div>

									<div className="tech-item">
										<h4>📱 Підтримка користувачів</h4>
										<ul>
											<li><strong>Час відповіді:</strong> До 24 годин</li>
											<li><strong>Робочі години:</strong> Пн-Пт 09:00-16:00</li>
											<li>Email: support@forze.space</li>
										</ul>
									</div>
								</div>
							</div>
						</section>

						{/* 4. Способи оплати */}
						<section className="terms-section payment">
							<h2 className="section-title">
								<span className="section-number">4</span>
								Способи оплати та активація послуг
							</h2>
							<div className="section-content">

								<div className="payment-info">
									<h3>💳 Доступні способи оплати</h3>
									<div className="payment-methods">
										<div className="payment-method">
											<h4>Банківські картки</h4>
											<p>Visa, MasterCard через захищену систему WayForPay</p>
										</div>
										<div className="payment-method">
											<h4>Інтернет-банкінг</h4>
											<p>PrivatBank, Monobank та інші українські банки</p>
										</div>
										<div className="payment-method">
											<h4>Мобільні платежі</h4>
											<p>Через мобільні додатки банків</p>
										</div>
									</div>
								</div>

								<div className="activation-info">
									<h3>⚡ Терміни активації послуг</h3>
									<div className="activation-timeline">
										<div className="timeline-item">
											<span className="timeline-icon">💎</span>
											<div className="timeline-content">
												<h4>Донат баланс</h4>
												<p><strong>Миттєво</strong> після підтвердження платежу</p>
											</div>
										</div>
										<div className="timeline-item">
											<span className="timeline-icon">👑</span>
											<div className="timeline-content">
												<h4>VIP-статуси</h4>
												<p><strong>До 30 хвилин</strong> після оплати (зазвичай миттєво)</p>
											</div>
										</div>
										<div className="timeline-item">
											<span className="timeline-icon">🎁</span>
											<div className="timeline-content">
												<h4>Ігрові набори</h4>
												<p><strong>До 1 години</strong> або при наступному вході в гру</p>
											</div>
										</div>
									</div>
								</div>

								<div className="payment-notice">
									<h3>⚠️ Важливо знати</h3>
									<ul>
										<li>Оплата здійснюється виключно в українських гривнях (грн)</li>
										<li>Платежі обробляються через сертифіковану систему WayForPay</li>
										<li>При проблемах з активацією звертайтесь до підтримки протягом 7 днів</li>
										<li>Чеки та квитанції зберігайте до отримання послуг</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 5. Правила поведінки */}
						<section className="terms-section rules">
							<h2 className="section-title">
								<span className="section-number">5</span>
								Правила поведінки на сервері
							</h2>
							<div className="section-content">
								<p>
									Для забезпечення комфортної гри всіх учасників встановлено наступні правила:
								</p>

								<div className="rules-list">

									<div className="rule-item severe">
										<div className="rule-header">
											<span className="rule-number">1</span>
											<h4>Без гри з чітами чи експлойтами</h4>
											<span className="severity-badge severe">Критичне</span>
										</div>
										<p>Заборонено використовувати сторонні програми, баги або чіти для отримання переваг.</p>
										<div className="punishment">
											<strong>Покарання:</strong> Миттєвий бан (тимчасовий або перманентний), видалення здобутих переваг.
										</div>
									</div>

									<div className="rule-item high">
										<div className="rule-header">
											<span className="rule-number">2</span>
											<h4>Без грифу та крадіжок</h4>
											<span className="severity-badge high">Серйозне</span>
										</div>
										<p>Це PvE сервер — поважайте працю інших. Гриф, крадіжки та знищення чужих побудов суворо заборонені.</p>
										<div className="punishment">
											<strong>Покарання:</strong> Відновлення збитків, тимчасовий бан (3–14 днів).
										</div>
									</div>

									<div className="rule-item high">
										<div className="rule-header">
											<span className="rule-number">3</span>
											<h4>Поважай інших гравців</h4>
											<span className="severity-badge high">Серйозне</span>
										</div>
										<p>Образи, цькування, расизм, сексизм або інша форма токсичності не допускається.</p>
										<div className="punishment">
											<strong>Покарання:</strong> Попередження → Мут (15 хв - 3 дні) → Тимчасовий/перманентний бан.
										</div>
									</div>

									<div className="rule-item medium">
										<div className="rule-header">
											<span className="rule-number">4</span>
											<h4>Без реклами</h4>
											<span className="severity-badge medium">Помірне</span>
										</div>
										<p>Заборонено рекламувати інші сервери, канали, сайти без дозволу адміністрації.</p>
										<div className="punishment">
											<strong>Покарання:</strong> Миттєвий мут → Тимчасовий/перманентний бан при навмисній рекламі.
										</div>
									</div>

									<div className="rule-item medium">
										<div className="rule-header">
											<span className="rule-number">5</span>
											<h4>Заборонено автоклікери</h4>
											<span className="severity-badge medium">Помірне</span>
										</div>
										<p>Не дозволяється використовувати автоклікери, макроси, скрипти або засоби імітації ручних дій.</p>
										<div className="punishment">
											<strong>Покарання:</strong> Попередження → Тимчасовий бан (1–7 днів).
										</div>
									</div>

									<div className="rule-item low">
										<div className="rule-header">
											<span className="rule-number">6</span>
											<h4>Використовуйте землю відповідально</h4>
											<span className="severity-badge low">Легке</span>
										</div>
										<p>Заборонено хаотичне будівництво чи зайняття великих територій без потреби.</p>
										<div className="punishment">
											<strong>Покарання:</strong> Попередження → Видалення споруд → Тимчасовий бан.
										</div>
									</div>

									<div className="rule-item high">
										<div className="rule-header">
											<span className="rule-number">7</span>
											<h4>Дотримуйтесь інструкцій адміністрації</h4>
											<span className="severity-badge high">Серйозне</span>
										</div>
										<p>Адміністрація має право втручатися в гру для збереження порядку. Її рішення — остаточні.</p>
										<div className="punishment">
											<strong>Покарання:</strong> Попередження → Мут/бан → Відмова від співпраці = перманентний бан.
										</div>
									</div>

									<div className="rule-item medium">
										<div className="rule-header">
											<span className="rule-number">8</span>
											<h4>PVP тільки за домовленістю</h4>
											<span className="severity-badge medium">Помірне</span>
										</div>
										<p>Безглузді напади без домовленості чи причини (війна кланів, арена, івенти) заборонені.</p>
										<div className="punishment">
											<strong>Покарання:</strong> 1-е порушення: Попередження/бан (1-3 дні) → 2-е: Довготривалий/постійний бан.
										</div>
									</div>

								</div>

								<div className="rules-notice">
									<p>
										<strong>🔔 Зверніть увагу:</strong> Кожне порушення оцінюється індивідуально.
										Адміністрація залишає за собою право діяти на розсуд у виняткових ситуаціях
										для підтримки позитивної атмосфери гри.
									</p>
								</div>
							</div>
						</section>

						{/* 6. Відповідальність сторін */}
						<section className="terms-section">
							<h2 className="section-title">
								<span className="section-number">6</span>
								Відповідальність та зобов'язання сторін
							</h2>
							<div className="section-content">

								<div className="responsibility-section">
									<h3>🏢 Відповідальність адміністрації</h3>
									<div className="responsibility-grid">
										<div className="responsibility-item positive">
											<h4>✅ Ми гарантуємо:</h4>
											<ul>
												<li>Підтримку роботи сервера 99% часу</li>
												<li>Технічну підтримку користувачів</li>
												<li>Захист персональних даних</li>
												<li>Справедливе розгляд скарг та звернень</li>
												<li>Попередження про технічні роботи</li>
											</ul>
										</div>
										<div className="responsibility-item negative">
											<h4>❌ Ми НЕ відповідаємо за:</h4>
											<ul>
												<li>Втрату ігрових досягнень через дії користувача</li>
												<li>Проблеми з інтернет-з'єднанням користувача</li>
												<li>Несумісність з модифікаціями Minecraft</li>
												<li>Форс-мажорні обставини (аварії, війна, тощо)</li>
												<li>Конфлікти між користувачами поза грою</li>
											</ul>
										</div>
									</div>
								</div>

								<div className="responsibility-section">
									<h3>👤 Відповідальність користувачів</h3>
									<div className="user-obligations">
										<ul>
											<li>Дотримання всіх правил сервера та умов використання</li>
											<li>Збереження конфіденційності своїх облікових даних</li>
											<li>Повідомлення про виявлені помилки та порушення</li>
											<li>Поважне ставлення до інших учасників спільноти</li>
											<li>Використання актуальних версій Minecraft</li>
										</ul>
									</div>
								</div>
							</div>
						</section>

						{/* 7. Інтелектуальна власність */}
						<section className="terms-section">
							<h2 className="section-title">
								<span className="section-number">7</span>
								Інтелектуальна власність
							</h2>
							<div className="section-content">
								<div className="ip-section">
									<h3>🏛️ Права на контент</h3>
									<ul>
										<li>Minecraft є торговою маркою Mojang Studios</li>
										<li>Forze Space є назвою та брендом нашого проєкту</li>
										<li>Унікальні налаштування, плагіни та контент належать адміністрації</li>
										<li>Користувачі зберігають права на свої творіння в грі</li>
										<li>Заборонено копіювання унікальних елементів сервера</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 8. Зміна умов */}
						<section className="terms-section">
							<h2 className="section-title">
								<span className="section-number">8</span>
								Зміна умов та повідомлення
							</h2>
							<div className="section-content">
								<p>
									Адміністрація залишає за собою право вносити зміни до цих Умов використання
									у наступних випадках:
								</p>
								<ul>
									<li>Зміни в законодавстві України</li>
									<li>Технічні оновлення сервера</li>
									<li>Покращення якості послуг</li>
									<li>Додавання нових функцій</li>
								</ul>
								<div className="change-notice">
									<h4>📢 Порядок повідомлення про зміни:</h4>
									<ul>
										<li>Повідомлення на сайті за 7 днів до набрання чинності</li>
										<li>Сповіщення в Discord або Telegram</li>
										<li>Email-розсилка (якщо є підписка)</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 9. Вирішення спорів */}
						<section className="terms-section">
							<h2 className="section-title">
								<span className="section-number">9</span>
								Вирішення спорів та застосовне право
							</h2>
							<div className="section-content">
								<div className="dispute-process">
									<h3>⚖️ Порядок вирішення спорів</h3>
									<div className="dispute-steps">
										<div className="dispute-step">
											<span className="step-number">1</span>
											<div className="step-content">
												<h4>Претензійний порядок</h4>
												<p>Звернення до підтримки support@forze.space з детальним описом проблеми</p>
											</div>
										</div>
										<div className="dispute-step">
											<span className="step-number">2</span>
											<div className="step-content">
												<h4>Розгляд адміністрацією</h4>
												<p>Розгляд звернення протягом 5 робочих днів та надання письмової відповіді</p>
											</div>
										</div>
										<div className="dispute-step">
											<span className="step-number">3</span>
											<div className="step-content">
												<h4>Судовий порядок</h4>
												<p>У разі недосягнення згоди — звернення до суду за місцем реєстрації ФОП</p>
											</div>
										</div>
									</div>
								</div>
								<div className="applicable-law">
									<h4>📜 Застосовне право</h4>
									<p>
										Ці Умови використання регулюються законодавством України.
										Всі спори вирішуються відповідно до чинного законодавства України.
									</p>
								</div>
							</div>
						</section>

						{/* 10. Контактна інформація */}
						<section className="terms-section contact">
							<h2 className="section-title">
								<span className="section-number">10</span>
								Контактна інформація
							</h2>
							<div className="section-content">
								<div className="contact-grid">
									<div className="contact-card">
										<h4>🏢 Надавач послуг</h4>
										<p>Фізична особа-підприємець Мелай Даяна Дмитрівна</p>
										<p><strong>ІПН:</strong> 3788309149</p>
									</div>
									<div className="contact-card">
										<h4>📧 Технічна підтримка</h4>
										<p><a href="mailto:support@forze.space">support@forze.space</a></p>
										<p><strong>Час відповіді:</strong> До 24 годин</p>
									</div>
									<div className="contact-card">
										<h4>📱 Телефон</h4>
										<p><a href="tel:+380980275819">+38 098 027 58 19</a></p>
										<p><strong>Години роботи:</strong> Пн-Пт 09:00-16:00</p>
									</div>
									<div className="contact-card">
										<h4>🌐 Веб-сайт</h4>
										<p><a href="https://forze.space">forze.space</a></p>
										<p><strong>IP сервера:</strong> mine.forze.space</p>
									</div>
								</div>
							</div>
						</section>

						{/* 11. Заключні положення */}
						<section className="terms-section">
							<h2 className="section-title">
								<span className="section-number">11</span>
								Заключні положення
							</h2>
							<div className="section-content">
								<ul>
									<li>
										Ці Умови використання набирають чинності з моменту початку користування
										послугами сервера Forze Space.
									</li>
									<li>
										У разі визнання будь-якого положення цих Умов недійсним,
										решта положень залишаються в силі.
									</li>
									<li>
										Ці Умови є публічною офертою відповідно до статті 633 Цивільного кодексу України.
									</li>
									<li>
										Дякуємо, що обрали Forze Space! Бажаємо приємної гри! 🎮
									</li>
								</ul>
							</div>
						</section>

					</div>
				</div>
			</main>
		</>
	);
};

export default TermsPage;
import React from 'react';
import SEOHelmet from '../../common/SEOHelmet/SEOHelmet';
import './styles/refund-policy.scss';

const RefundPolicyPage = () => {
	return (
		<>
			<SEOHelmet
				title="Політика повернення коштів - Minecraft сервер Forze Space"
				description="Умови та процедура повернення коштів за підтримку проєкту Minecraft сервера Forze Space. Правила донату та отримання бонусів."
				canonical="https://forze.space/refund-policy"
			/>

			<main className="refund-policy-page">
				<div className="container">
					<div className="policy-header">
						<h1>Політика повернення коштів</h1>
						<p className="policy-subtitle">
							Умови та правила щодо підтримки проєкту Minecraft сервера Forze Space
						</p>
						<div className="last-updated">
							Останнє оновлення: {new Date().toLocaleDateString('uk-UA')}
						</div>
					</div>

					<div className="policy-content">

						{/* 1. Загальні положення */}
						<section className="policy-section">
							<h2 className="section-title">
								<span className="section-number">1</span>
								Загальні положення
							</h2>
							<div className="section-content">
								<p>
									Ця Політика повернення коштів регулює умови фінансової підтримки
									проєкту Minecraft сервера <strong>Forze Space</strong>, що здійснюється
									фізичною особою-підприємцем Мелай Даяна Дмитрівна (ІПН: 3788309149).
								</p>
								<p>
									Використовуючи систему донату на нашому сайті, ви автоматично
									погоджуєтесь з умовами цієї політики.
								</p>
							</div>
						</section>

						{/* 2. Природа донату */}
						<section className="policy-section highlight">
							<h2 className="section-title">
								<span className="section-number">2</span>
								Природа донату та підтримки проєкту
							</h2>
							<div className="section-content">
								<div className="important-notice">
									<h3>📢 ВАЖЛИВО: Донат є добровільною підтримкою проєкту</h3>
									<ul>
										<li>
											<strong>Донат</strong> — це добровільний внесок на підтримку
											та розвиток Minecraft сервера Forze Space.
										</li>
										<li>
											<strong>Донат баланс</strong> не є валютою, платіжним засобом
											або товаром, що підлягає купівлі-продажу.
										</li>
										<li>
											Донат баланс <strong>не виводиться</strong>, <strong>не конвертується</strong>
											та <strong>не має реальної цінності</strong> поза межами гри.
										</li>
										<li>
											Донат баланс використовується <strong>виключно всередині гри</strong>
											для отримання бонусів та покращень ігрового досвіду.
										</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 3. Бонуси за підтримку */}
						<section className="policy-section">
							<h2 className="section-title">
								<span className="section-number">3</span>
								Бонуси за підтримку проєкту
							</h2>
							<div className="section-content">
								<p>
									Як подяку за фінансову підтримку проєкту, гравці отримують
									бонуси в грі, що включають:
								</p>
								<div className="bonus-grid">
									<div className="bonus-item">
										<span className="bonus-icon">👑</span>
										<div className="bonus-info">
											<h4>VIP-статуси та ролі</h4>
											<p>Спеціальні привілеї та можливості на сервері</p>
										</div>
									</div>
									<div className="bonus-item">
										<span className="bonus-icon">🎁</span>
										<div className="bonus-info">
											<h4>Ігрові набори</h4>
											<p>Унікальні предмети, ресурси та інструменти</p>
										</div>
									</div>
									<div className="bonus-item">
										<span className="bonus-icon">💎</span>
										<div className="bonus-info">
											<h4>Ігрова валюта</h4>
											<p>Внутрішньосерверна валюта для покупок</p>
										</div>
									</div>
									<div className="bonus-item">
										<span className="bonus-icon">🏠</span>
										<div className="bonus-info">
											<h4>Додаткові можливості</h4>
											<p>Розширений функціонал та ексклюзивний контент</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* 4. Політика повернення */}
						<section className="policy-section warning">
							<h2 className="section-title">
								<span className="section-number">4</span>
								Політика повернення коштів
							</h2>
							<div className="section-content">
								<div className="no-refund-notice">
									<h3>🚫 Кошти за донат НЕ повертаються</h3>
									<p>
										<strong>Принципова позиція:</strong> Оскільки донат є добровільною
										підтримкою проєкту, а не комерційною послугою, повернення коштів
										<strong> не здійснюється</strong>.
									</p>
								</div>

								<div className="refund-reasons">
									<h4>Чому ми не повертаємо кошти за донат:</h4>
									<ul>
										<li>Донат є добровільною підтримкою, а не покупкою товару</li>
										<li>Кошти спрямовуються на розвиток та підтримку сервера</li>
										<li>Бонуси надаються як подяка, а не як товар</li>
										<li>Донат баланс не має грошової цінності</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 5. Виключення та особливі випадки */}
						<section className="policy-section success">
							<h2 className="section-title">
								<span className="section-number">5</span>
								Виключення та особливі випадки
							</h2>
							<div className="section-content">
								<div className="exception-cases">

									<div className="exception-item">
										<h4>💰 Помилкові платежі</h4>
										<p>
											Якщо ви випадково здійснили помилковий платіж (неправильна сума,
											подвійне списання тощо), ми розглянемо можливість повернення коштів
											в індивідуальному порядку.
										</p>
										<div className="requirement">
											<strong>Умова:</strong> Звернення протягом 7 днів з доказами помилки
										</div>
									</div>

									<div className="exception-item">
										<h4>👶 Платежі неповнолітніх</h4>
										<p>
											Якщо платіж було здійснено неповнолітньою особою без згоди батьків
											або законних представників, кошти можуть бути повернені.
										</p>
										<div className="requirement">
											<strong>Умова:</strong> Звернення батьків/опікунів з документами протягом 7 днів
										</div>
									</div>

									<div className="exception-item technical">
										<h4>⚙️ Технічні збої</h4>
										<p>
											Якщо через технічні проблеми з нашого боку донат було списано,
											але бонуси не надійшли, ми компенсуємо це наступним чином:
										</p>
										<div className="compensation">
											<strong>Компенсація:</strong> Нарахування донат балансу + 20% зверху як вибачення
										</div>
										<div className="requirement">
											<strong>Умова:</strong> Звернення протягом 7 днів з доказами платежу
										</div>
									</div>

								</div>
							</div>
						</section>

						{/* 6. Процедура звернення */}
						<section className="policy-section">
							<h2 className="section-title">
								<span className="section-number">6</span>
								Процедура подачі заяви
							</h2>
							<div className="section-content">
								<div className="procedure-steps">
									<div className="step">
										<span className="step-number">1</span>
										<div className="step-content">
											<h4>Підготовка документів</h4>
											<p>Зберіть всі необхідні докази: скриншоти платежу, повідомлення з банку, опис проблеми</p>
										</div>
									</div>
									<div className="step">
										<span className="step-number">2</span>
										<div className="step-content">
											<h4>Звернення до підтримки</h4>
											<p>Напишіть на <strong>support@forze.space</strong> або зателефонуйте за номером <strong>+38 098 027 58 19</strong></p>
										</div>
									</div>
									<div className="step">
										<span className="step-number">3</span>
										<div className="step-content">
											<h4>Розгляд заяви</h4>
											<p>Ми розглянемо вашу заяву протягом <strong>3-5 робочих днів</strong> та надамо письмову відповідь</p>
										</div>
									</div>
								</div>

								<div className="required-info">
									<h4>📋 Інформація, яку необхідно надати:</h4>
									<ul>
										<li>Ваш ігровий нікнейм</li>
										<li>Дата та час платежу</li>
										<li>Сума платежу</li>
										<li>Скриншот/фото чеку або повідомлення про списання</li>
										<li>Детальний опис проблеми</li>
										<li>Контактні дані для зв'язку</li>
									</ul>
								</div>
							</div>
						</section>

						{/* 7. Терміни */}
						<section className="policy-section">
							<h2 className="section-title">
								<span className="section-number">7</span>
								Терміни звернення та розгляду
							</h2>
							<div className="section-content">
								<div className="timeline">
									<div className="timeline-item">
										<span className="timeline-icon">📅</span>
										<div className="timeline-content">
											<h4>Термін звернення</h4>
											<p><strong>7 днів</strong> з моменту здійснення платежу</p>
										</div>
									</div>
									<div className="timeline-item">
										<span className="timeline-icon">⏰</span>
										<div className="timeline-content">
											<h4>Термін розгляду</h4>
											<p><strong>3-5 робочих днів</strong> з моменту отримання всіх необхідних документів</p>
										</div>
									</div>
									<div className="timeline-item">
										<span className="timeline-icon">💸</span>
										<div className="timeline-content">
											<h4>Термін повернення</h4>
											<p><strong>5-10 робочих днів</strong> (у виняткових випадках)</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* 8. Контактна інформація */}
						<section className="policy-section contact">
							<h2 className="section-title">
								<span className="section-number">8</span>
								Контакти для звернень
							</h2>
							<div className="section-content">
								<div className="contact-cards">
									<div className="contact-card">
										<h4>📧 Email підтримка</h4>
										<p><a href="mailto:support@forze.space">support@forze.space</a></p>
										<span className="contact-note">Рекомендований спосіб зв'язку</span>
									</div>
									<div className="contact-card">
										<h4>📱 Телефон</h4>
										<p><a href="tel:+380980275819">+38 098 027 58 19</a></p>
										<span className="contact-note">Пн-Пт: 09:00 - 16:00</span>
									</div>
								</div>
								<div className="response-time">
									<p><strong>⏱️ Час відповіді:</strong> Зазвичай відповідаємо протягом 24 годин у робочі дні</p>
								</div>
							</div>
						</section>

						{/* 9. Заключні положення */}
						<section className="policy-section">
							<h2 className="section-title">
								<span className="section-number">9</span>
								Заключні положення
							</h2>
							<div className="section-content">
								<ul>
									<li>
										Адміністрація залишає за собою право вносити зміни до цієї політики
										з обов'язковим повідомленням користувачів.
									</li>
									<li>
										Всі спори вирішуються шляхом переговорів, а у разі недосягнення
										згоди — в судовому порядку згідно з законодавством України.
									</li>
									<li>
										Ця політика є частиною Умов використання сервера Forze Space.
									</li>
									<li>
										Підтримуючи проєкт, ви допомагаєте розвивати один з найкращих
										українських Minecraft серверів!
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

export default RefundPolicyPage;
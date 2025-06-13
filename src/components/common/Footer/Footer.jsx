import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { MINECRAFT_URL } from '../../../constants/config';
import CopyString from '../../ui/CopyString/CopyString';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className="site-footer">
			<div className="container">
				<div className="footer-content">
					{/* Основна інформація */}
					<div className="footer-section">
						<h3 className="footer-title">Forze Space</h3>
						<p className="footer-description">
							Найкращий український Minecraft сервер.
							Розвивайся, грай та насолоджуйся неймовірними пригодами!
						</p>
						<div className="server-ip">
							<CopyString string={MINECRAFT_URL} />
						</div>
					</div>

					{/* Навігація */}
					<div className="footer-section">
						<h4 className="footer-subtitle">Навігація</h4>
						<ul className="footer-links">
							<li><Link to={ROUTES.HOME}>Головна</Link></li>
							<li><Link to={ROUTES.SHOP}>Магазин</Link></li>
							{/* <li><Link to={ROUTES.MINI_GAMES}>Ігри</Link></li> */}
							{/* <li><Link to={ROUTES.EVENTS}>Події</Link></li> */}
							<li><Link to={ROUTES.PROFILE}>Профіль</Link></li>
						</ul>
					</div>

					{/* Юридична інформація (обов'язково для WayForPay) */}
					<div className="footer-section">
						<h4 className="footer-subtitle">Інформація</h4>
						<ul className="footer-links">
							<li><Link to="/contacts">Контакти</Link></li>
							<li><Link to="/terms">Умови використання</Link></li>
							<li><Link to="/refund-policy">Політика повернення</Link></li>
							<li><Link to="/privacy-policy">Політика конфіденційності</Link></li>
						</ul>
					</div>

					{/* Контакти */}
					<div className="footer-section">
						<h4 className="footer-subtitle">Зв'язок</h4>
						<div className="footer-contacts">
							<div className="contact-item">
								<span className="contact-icon">📧</span>
								<a href="mailto:support@forze.space">support@forze.space</a>
							</div>
							<div className="contact-item">
								<span className="contact-icon">📱</span>
								<a href="tel:+380980275819">+38 098 027 58 19</a>
							</div>
							<div className="contact-item">
								<span className="contact-icon">🕐</span>
								<span>Пн-Пт: 09:00 - 16:00</span>
							</div>
						</div>

						{/* Соціальні мережі */}
						<div className="social-links">
							<a
								href="https://t.me/forze_space_bot"
								target="_blank"
								rel="noopener noreferrer"
								className="social-link telegram"
								title="Telegram бот"
							>
								📱
							</a>
						</div>
					</div>
				</div>

				{/* Нижній рядок */}
				<div className="footer-bottom">
					<div className="footer-bottom-content">
						<div className="copyright">
							<p>&copy; 2025 Forze Space. Всі права захищені.</p>
							<p className="legal-name">
								ФОП Мелай Даяна Дмитрівна, ІПН: 3788309149
							</p>
						</div>
						<div className="footer-links-inline">
							<Link to={"/contacts"}>Контакти</Link>
							<Link to="/terms">Умови</Link>
							<Link to="/refund-policy">Повернення</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
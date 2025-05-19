// src/pages/Profile.js
import { useState, useEffect } from 'react';
import { useAuth } from "../../../contexts/AuthContext"
import axios from 'axios';

function Profile() {
	const { user, logout } = useAuth();
	const [loading, setLoading] = useState(false);
	const [stats, setStats] = useState(null);
	const [error, setError] = useState(null);

	// Отримання статистики користувача
	useEffect(() => {
		if (user) {
			setLoading(true);

			// Отримуємо токен
			const token = document.cookie
				.split('; ')
				.find(row => row.startsWith('auth_token='))
				?.split('=')[1];

			// Отримуємо статистику (якщо у вас є окремий API для цього)
			axios.get(`https://server.forze.space/api/user/stats`, {
				headers: { 'Authorization': `Bearer ${token}` }
			})
				.then(res => {
					setStats(res.data);
				})
				.catch(err => {
					setError('Не вдалося завантажити статистику');
					console.error(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [user]);

	if (loading) {
		return (
			<div className="loading-screen">
				<div className="spinner"></div>
				<p>Завантаження даних профілю...</p>
			</div>
		);
	}

	return (
		<section className="profile">
			<div className="container">
				<h1>Профіль</h1>

				{user && (
					<div className="profile__wrapper">
						<div className="profile__header">
							<div className="avatar">
								<img
									src={`https://mc-heads.net/avatar/${user.minecraftNick || user.minecraft_nick}/100`}
									alt="Avatar"
								/>
							</div>
							<div className="info">
								<h2>{user.minecraftNick || user.minecraft_nick}</h2>
								<p>Роль: {user.role || "Гравець"}</p>
								<p>Зареєстрований: {new Date(user.registered_at).toLocaleDateString()}</p>
							</div>
						</div>

						<div className="profile__stats">
							<div className="stats-block">
								<h3>Баланс</h3>
								<div className="stat">
									<span>Ігрова валюта:</span>
									<span>{user.game_balance}</span>
								</div>
								<div className="stat">
									<span>Донат баланс:</span>
									<span>{user.donate_balance}</span>
								</div>
								{user.discount_percent && (
									<div className="stat">
										<span>Знижка:</span>
										<span>{user.discount_percent}%</span>
									</div>
								)}
							</div>

							{user.plan_data_available && (
								<div className="stats-block">
									<h3>Статистика гри</h3>
									<div className="stat">
										<span>Загальний час гри:</span>
										<span>{user.total_playtime_hours?.toFixed(1)} год.</span>
									</div>
									<div className="stat">
										<span>Кількість сесій:</span>
										<span>{user.total_sessions}</span>
									</div>
									<div className="stat">
										<span>Вбивств мобів:</span>
										<span>{user.total_mob_kills}</span>
									</div>
									<div className="stat">
										<span>Смертей:</span>
										<span>{user.total_deaths}</span>
									</div>
									{user.most_played_world && (
										<div className="stat">
											<span>Основний світ:</span>
											<span>{user.most_played_world}</span>
										</div>
									)}
								</div>
							)}
						</div>

						<div className="profile__actions">
							<button className="btn btn-danger" onClick={logout}>
								Вийти
							</button>
						</div>
					</div>
				)}

				{error && (
					<div className="error-message">
						<p>{error}</p>
						<button onClick={() => window.location.reload()}>Спробувати знову</button>
					</div>
				)}
			</div>
		</section>
	);
}

export default Profile;
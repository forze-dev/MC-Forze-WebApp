// src/pages/Profile.js
import { useAuth } from "../../../contexts/AuthContext"

function Profile() {
	const { user, logout } = useAuth();

	return (
		<section className="profile" style={{ padding: "90px 0" }}>
			<div className="container">
				{user && (
					<div className="profile__wrapper" style={{ gap: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
						<div className="avatar">
							<img
								src={`https://mc-heads.net/avatar/${user.minecraftNick || user.minecraft_nick}/100`}
								alt="Avatar"
							/>
						</div>
						<div className="profile__header">
							<div className="info">
								<h2 style={{ marginBottom: "8px" }} >{user.minecraftNick || user.minecraft_nick}</h2>
								<p>Роль: {user.role || "Гравець"}</p>
								<p>Зареєстрований: {new Date(user.registered_at).toLocaleDateString()}</p>
								<p>Смс в чаті за сьогодні: {user.messages_count}</p>
							</div>
						</div>

						<div className="stats-block">
							<h3 style={{ marginBottom: "8px" }}>Баланс</h3>
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
						<div className="profile__stats">
							{user.plan_data_available && (
								<div className="stats-block">
									<h3 style={{ marginBottom: "8px" }}>Статистика гри</h3>
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
			</div>
		</section>
	);
}

export default Profile;
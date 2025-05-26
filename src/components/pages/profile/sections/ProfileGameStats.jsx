// src/pages/profile/sections/ProfileGameStats.jsx

function ProfileGameStats({ user }) {
	// Розрахунок рівнів активності (приклад логіки)
	const getActivityLevel = (sessions) => {
		if (sessions >= 400) return { level: "Легендарний", progress: 100, color: "legendary" };
		if (sessions >= 200) return { level: "Експерт", progress: (sessions / 400) * 100, color: "expert" };
		if (sessions >= 80) return { level: "Досвідчений", progress: (sessions / 200) * 100, color: "experienced" };
		if (sessions >= 20) return { level: "Новачок", progress: (sessions / 80) * 100, color: "beginner" };
		return { level: "Початківець", progress: (sessions / 20) * 100, color: "starter" };
	};

	const activity = getActivityLevel(user.total_sessions || 0);

	// Розрахунок K/D ratio
	const kdRatio = user.total_deaths > 0 ? (user.total_mob_kills / user.total_deaths).toFixed(2) : user.total_mob_kills;

	return (
		<div className="profile-card game-stats-card">
			<div className="card-header">
				<h3 className="card-title">
					<span className="card-icon">🎯</span>
					Ігрова статистика
				</h3>
			</div>

			<div className="game-stats-content">
				{/* Рівень активності */}
				<div className="activity-level">
					<div className="activity-header">
						<span className="activity-label">Рівень активності</span>
						<span className={`activity-badge ${activity.color}`}>
							{activity.level}
						</span>
					</div>
					<div className="activity-progress">
						<div className="progress-bar">
							<div
								className={`progress-fill ${activity.color}`}
								style={{ width: `${Math.min(activity.progress, 100)}%` }}
							></div>
						</div>
						<span className="progress-percentage">
							{Math.round(activity.progress)}%
						</span>
					</div>
				</div>

				{/* K/D Ratio */}
				<div className="kd-ratio">
					<div className="ratio-header">
						<span className="ratio-icon">⚔️</span>
						<span className="ratio-label">Kill/Death Ratio</span>
					</div>
					<div className="ratio-value">
						<span className="ratio-number">{kdRatio}</span>
						<span className="ratio-breakdown">
							({user.total_mob_kills || 0} / {user.total_deaths || 0})
						</span>
					</div>
				</div>

				{/* Середня тривалість сесії */}
				{user.total_sessions > 0 && (
					<div className="session-average">
						<div className="session-header">
							<span className="session-icon">⏱️</span>
							<span className="session-label">Середня сесія</span>
						</div>
						<div className="session-value">
							{((user.total_playtime_hours || 0) / user.total_sessions).toFixed(1)} год
						</div>
					</div>
				)}

				{/* Додаткові показники */}
				<div className="session-average">
					<div className="session-header">
						<span className="session-icon">📈</span>
						<span className="session-label">Статус гравця</span>
					</div>
					<div className="session-value">
						<span>
							{user.total_playtime_hours > 200 ? "Хардкорний гравець" :
								user.total_playtime_hours > 100 ? "Активний гравець" :
									user.total_playtime_hours > 20 ? "Регулярний гравець" : "Новий гравець"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileGameStats;
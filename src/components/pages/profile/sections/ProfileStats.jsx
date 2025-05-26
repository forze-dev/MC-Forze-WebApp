// src/pages/profile/sections/ProfileStats.jsx

function ProfileStats({ user }) {
	const formatPlaytime = (hours) => {
		if (hours < 1) return `${Math.round(hours * 60)} хв`;
		if (hours < 24) return `${hours.toFixed(1)} год`;
		const days = Math.floor(hours / 24);
		const remainingHours = Math.floor(hours % 24);
		return `${days} дн ${remainingHours} год`;
	};

	const stats = [
		{
			icon: "🎮",
			label: "Загальний час гри",
			value: user.total_playtime_hours ? formatPlaytime(user.total_playtime_hours) : "0 хв",
			color: "accent"
		},
		{
			icon: "🔄",
			label: "Кількість сесій",
			value: user.total_sessions?.toLocaleString() || "0",
			color: "gold"
		},
		{
			icon: "⚔️",
			label: "Вбивств мобів",
			value: user.total_mob_kills?.toLocaleString() || "0",
			color: "red"
		},
		{
			icon: "💀",
			label: "Смертей",
			value: user.total_deaths?.toLocaleString() || "0",
			color: "gray"
		},
		{
			icon: "🌍",
			label: "Улюблений світ",
			value: user.most_played_world || "0",
			color: "gray"
		}
	];

	return (
		<div className="profile-card stats-card">
			<div className="card-header">
				<h3 className="card-title">
					<span className="card-icon">📊</span>
					Статистика
				</h3>
			</div>

			<div className="stats-grid">
				{stats.map((stat, index) => (
					<div key={index} className={`stat-item ${stat.color}`}>
						<div className="stat-icon">{stat.icon}</div>
						<div className="stat-content">
							<span className="stat-value">{stat.value}</span>
							<span className="stat-label">{stat.label}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProfileStats;
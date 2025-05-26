// src/pages/profile/sections/ProfileHeader.jsx
import { useAuth } from "../../../../contexts/AuthContext";

function ProfileHeader({ user }) {
	const { logout } = useAuth()

	return (
		<div className="profile-header">
			<div className="profile-header__bg"></div>
			<div className="profile-header__content">
				<div className="profile-avatar">
					<div className="avatar-ring">
						<img
							src={`https://mc-heads.net/avatar/${user.minecraftNick || user.minecraft_nick}/120`}
							alt="Avatar"
							className="avatar-image"
						/>
					</div>
					<div className="avatar-status online"></div>
				</div>

				<div className="profile-info">
					<div className="profile-info-content">
						<div className="profile-info-top">
							<h1 className="profile-name">
								{(user.minecraftNick || user.minecraft_nick)?.length > 16
									? `${(user.minecraftNick || user.minecraft_nick).slice(0, 16)}...`
									: (user.minecraftNick || user.minecraft_nick)
								}
							</h1>
							<div className="profile-role">
								<span className="role-badge">{user.role || "Гравець"}</span>
							</div>
						</div>
						<div className="profile-meta">
							<div className="meta-item">
								<span className="meta-icon">📅</span>
								<span>Зареєстрований {new Date(user.registered_at).toLocaleDateString()}</span>
							</div>
							<div className="meta-item">
								<span className="meta-icon">💬</span>
								<span>Повідомлень сьогодні: <strong>{user.messages_count}</strong></span>
							</div>
						</div>
					</div>
					<button className="btn btn-danger" onClick={logout}>
						Вийти з акаунту
					</button>
				</div>

			</div>
		</div>
	);
}

export default ProfileHeader;
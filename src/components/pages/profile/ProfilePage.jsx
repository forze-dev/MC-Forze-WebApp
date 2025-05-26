// src/pages/profile/ProfilePage.jsx
import { useAuth } from "../../../contexts/AuthContext"
import ProfileHeader from "./sections/ProfileHeader";
import ProfileStats from "./sections/ProfileStats";
import ProfileBalance from "./sections/ProfileBalance";
import ProfileGameStats from "./sections/ProfileGameStats";
import ShareProfile from "./components/ShareProfile";
import "./styles/ProfilePage.scss"

function ProfilePage() {
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	return (
		<main className="profile-page">
			<section className="profile-content">
				<div className="container">
					<ProfileHeader user={user} />
					<div className="profile-grid">
						<div className="profile-left">
							<ProfileBalance user={user} />
							{user.plan_data_available && (
								<ProfileGameStats user={user} />
							)}
						</div>

						<div className="profile-right">
							<ProfileStats user={user} />
						</div>
					</div>
				</div>
				<ShareProfile user={user} />
			</section>
		</main>
	);
}

export default ProfilePage;
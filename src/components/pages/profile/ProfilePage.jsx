// src/pages/profile/ProfilePage.jsx
import { useAuth } from "../../../contexts/AuthContext"
import { useState } from "react";
import ProfileHeader from "./sections/ProfileHeader";
import ProfileStats from "./sections/ProfileStats";
import ProfileBalance from "./sections/ProfileBalance";
import ProfileGameStats from "./sections/ProfileGameStats";
import ShareProfile from "./components/ShareProfile";
import TransferModal from "./components/TransferModal";
import "./styles/ProfilePage.scss"
import "./styles/ProfileHeader.scss";
import "./styles/ProfileBalance.scss";
import "./styles/ProfileGameStats.scss";
import "./styles/ProfileStats.scss";


function ProfilePage() {
	const { user } = useAuth();

	const [showTransferModal, setShowTransferModal] = useState(false);

	const handleTransferSuccess = (result) => {
		// Можна додати тост-повідомлення або інші дії після успішного переказу
		console.log('Переказ успішно виконано:', result);
	};

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
							<ProfileBalance user={user} setShowTransferModal={setShowTransferModal} />
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
			<TransferModal
				isOpen={showTransferModal}
				onClose={() => setShowTransferModal(false)}
				onSuccess={handleTransferSuccess}
			/>
		</main>
	);
}

export default ProfilePage;
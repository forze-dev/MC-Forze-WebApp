import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ROUTES } from "./constants/routes"

import Header from "./components/common/Header/Header"
import Footer from "./components/common/Footer/Footer"
import ProtectedRoute from "./components/common/Protected/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"

import HomePage from "./components/pages/home/HomePage"
import AuthPage from "./components/pages/auth/AuthPage"
import Profile from "./components/pages/profile/ProfilePage"
import ShopPage from "./components/pages/shop/ShopPage"
import ContactsPage from "./components/pages/contacts/ContactsPage"
import RefundPolicyPage from "./components/pages/refund-policy/RefundPolicyPage"
import TermsPage from "./components/pages/terms/TermsPage"
import PrivacyPolicyPage from "./components/pages/privacy-policy/PrivacyPolicyPage"
import QuestsPage from "./components/pages/quests/QuestsPage"
import QuestDetailPage from "./components/pages/quest-detail/QuestDetailPage"

function App() {


	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="app">
					<Header />
					<Routes>
						<Route path={ROUTES.HOME} element={<HomePage />} />
						<Route path="/shop" element={<ShopPage />} />
						{/*<Route path="/games" element={<QuestsPage />} />*/}
						<Route path="/quests" element={<QuestsPage />} />
						<Route path="/quests/:questName" element={<QuestDetailPage />} />
						<Route path="/authorization" element={<AuthPage />} />
						<Route path="/contacts" element={<ContactsPage />} />
						<Route path="/refund-policy" element={<RefundPolicyPage />} />
						<Route path="/terms" element={<TermsPage />} />
						<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

						<Route
							path={ROUTES.PROFILE}
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
					</Routes>
					<Footer />
				</div>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App


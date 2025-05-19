import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ROUTES } from "./constants/routes"

import Header from "./components/common/Header/Header"
import ProtectedRoute from "./components/common/Protected/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"

import HomePage from "./components/pages/home/HomePage"
import AuthPage from "./components/pages/auth/AuthPage"
import Profile from "./components/pages/profile/ProfilePage"

function App() {


	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="app">
					<Header />
					<main>
						<Routes>
							<Route path={ROUTES.HOME} element={<HomePage />} />
							{/* <Route path="/shop" element={<Shop />} />
							<Route path="/games" element={<Games />} />
							<Route path="/events" element={<Events />} /> */}
							<Route path="/authorization" element={<AuthPage />} />
							<Route
								path={ROUTES.PROFILE}
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</main>
				</div>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App


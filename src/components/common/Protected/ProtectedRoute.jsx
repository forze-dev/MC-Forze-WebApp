import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

function ProtectedRoute({ children }) {
	const { loading, isAuthenticated, initialized } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Перенаправляємо тільки після ініціалізації контексту
		if (initialized && !loading && !isAuthenticated) {
			navigate(`/authorization?returnUrl=${encodeURIComponent(location.pathname)}`, { replace: true });
		}
	}, [isAuthenticated, loading, initialized, navigate, location]);

	// Показуємо лоадер поки ініціалізується контекст
	if (!initialized || loading) {
		return (
			<div style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '50vh',
				flexDirection: 'column',
				gap: '10px'
			}}>
				<div style={{
					width: '40px',
					height: '40px',
					border: '3px solid rgba(255,255,255,0.3)',
					borderTop: '3px solid var(--accent)',
					borderRadius: '50%',
					animation: 'spin 1s linear infinite'
				}}></div>
				<p>Завантаження...</p>
				<style>
					{`
						@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
						}
					`}
				</style>
			</div>
		);
	}

	// Якщо користувач не авторизований, не показуємо контент
	// (перенаправлення вже відбулося в useEffect)
	if (!isAuthenticated) {
		return null;
	}

	return children;
}

export default ProtectedRoute;
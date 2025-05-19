import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

function ProtectedRoute({ children }) {
	const { user, loading, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			navigate(`/authorization?returnUrl=${encodeURIComponent(location.pathname)}`, { replace: true });
		}
	}, [isAuthenticated, loading, navigate, location]);

	if (loading) {
		return (
			<div className="loading-screen">
				<div className="spinner"></div>
				<p>Завантаження...</p>
			</div>
		);
	}

	return isAuthenticated ? children : null;
}

export default ProtectedRoute;
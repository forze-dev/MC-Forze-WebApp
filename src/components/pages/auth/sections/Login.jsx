import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { LockKeyhole, User } from 'lucide-react';
import '../styles/login.scss'

function Login() {
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		// Очищаємо помилку при редагуванні
		if (error) setError(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Валідація форми
		if (!formData.username || !formData.password) {
			setError('Будь ласка, заповніть всі поля');
			return;
		}

		setLoading(true);

		try {
			await login(formData.username, formData.password);
		} catch (err) {
			setError(err.message);
		} finally {
			setTimeout(() => {
				setError(null)
			}, 3000)
			setLoading(false);
			setFormData({
				username: '',
				password: ''
			})
		}
	};

	return (
		<section className="auth-form">
			<div className="container">
				<h1>Forze Space | Авторизація</h1>
				<div className="auth-form__wrapper">
					<form onSubmit={handleSubmit}>
						<div className="input-group">
							<User size={18} />
							<input
								type="text"
								name="username"
								placeholder="Майнкрафт нік"
								value={formData.username}
								onChange={handleChange}
								disabled={loading}
								required
							/>
						</div>
						<div className="input-group">
							<LockKeyhole size={18} />
							<input
								type="password"
								name="password"
								placeholder="Пароль"
								value={formData.password}
								onChange={handleChange}
								disabled={loading}
								required
							/>
						</div>
						{error && <div className="error-message">{error}</div>}
						<button className="btn" type="submit" disabled={loading}>
							{loading ? "Зачекайте..." : "Увійти"}
						</button>
					</form>
				</div>
				<p>
					Ще не маєш акаунту? <br /> Ти можеш його створити у нашому{" "}
					<a target="_blank" href="https://t.me/forze_space_bot" rel="noopener noreferrer">
						телеграм боті
					</a>
				</p>
			</div>
		</section>
	);
}

export default Login;
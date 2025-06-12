import Login from "./sections/Login"
import SEOHelmet from "../../common/SEOHelmet/SEOHelmet"

const AuthPage = () => {
	return (
		<>
			<SEOHelmet
				title={"Майнкрафт сервер Forze Space — Увійди до профілю та грай без обмежень!"}
				canonical={"https://forze.space/authorization"}
				description={"Увійди до свого профілю на сервері Forze Space. Зберігай прогрес, переглядай статистику, керуй акаунтом та насолоджуйся персоналізованим досвідом гри!"}
			/>
			<main>
				<Login />
			</main>
		</>
	)
}

export default AuthPage
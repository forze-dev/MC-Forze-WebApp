import "./Profiler.scss"
import { useAuth } from "../../../contexts/AuthContext"
import { Link } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"

const Profiler = () => {
	const { user } = useAuth()


	return (
		<div className="Profiler">
			{
				user ?
					<Link to={ROUTES.PROFILE}>
						<span>{user.game_balance}</span>
						<img src="/assets/icons/GFC.svg" alt="G" />
						<span>{user.donate_balance}</span>
						<img src="/assets/icons/DFC.svg" alt="G" />
					</Link> : <Link to={ROUTES.AUTHORIZATION}>Увійти</Link>
			}
		</div>
	)
}

export default Profiler
import { NavLink, useLocation } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"
import "./Navigation.scss"

const Navigation = () => {
	const { pathname } = useLocation();

	return (
		<nav className="menu">
			<ul>
				<li className={pathname === ROUTES.HOME ? "active" : ""}>
					<NavLink to={ROUTES.HOME}>
						<figure className="icon-box">

						</figure>
						<span>
							Головна
						</span>
					</NavLink>
				</li>
				<li className={pathname === ROUTES.SHOP ? "active" : ""}>
					<NavLink to={ROUTES.SHOP}>
						<figure className="icon-box">

						</figure>
						<span>
							Магазин
						</span>
					</NavLink>
				</li>
				<li className={pathname === ROUTES.MINI_GAMES ? "active" : ""}>
					<NavLink to={ROUTES.MINI_GAMES}>
						<figure className="icon-box">

						</figure>
						<span>
							Ігри
						</span>
					</NavLink>
				</li>
				<li className={pathname === ROUTES.EVENTS ? "active" : ""}>
					<NavLink to={ROUTES.EVENTS}>
						<figure className="icon-box">

						</figure>
						<span>
							Події
						</span>
					</NavLink>
				</li>
				<li className={`btn ${pathname === ROUTES.PROFILE ? "active" : ""}`}>
					<NavLink to={ROUTES.PROFILE}>
						<figure className="icon-box">

						</figure>
						<span>
							Профіль
						</span>
					</NavLink>
				</li>
			</ul>
		</nav >
	)
}

export default Navigation
import "./Header.scss"
import Navigation from "../Navigation/Navigation"
import Logo from "../../ui/Logo/Logo"
import { useLocation } from "react-router-dom"

const Header = () => {
	const { pathname } = useLocation();

	return (
		<header className={`header${pathname.length === 1 ? "-without-back" : ""}`}>
			<div className="container">
				<div className="header__wrapper">
					<Logo />
					<Navigation />
				</div>
			</div>
		</header>
	)
}

export default Header
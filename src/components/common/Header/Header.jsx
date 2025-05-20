import "./Header.scss"
import Navigation from "../Navigation/Navigation"
import Logo from "../../ui/Logo/Logo"
import { useLocation } from "react-router-dom"
import Profiler from "../Profiler/Profiler"
import { useState, useEffect } from "react"

const Header = () => {
	const { pathname } = useLocation();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Можете змінити це значення залежно від того, коли хочете активувати клас
			const scrollPosition = window.scrollY;
			if (scrollPosition > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		// Додаємо слухач події скролу
		window.addEventListener("scroll", handleScroll);

		// Очищаємо слухач при розмонтуванні компонента
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []); // Пустий масив залежностей означає, що ефект запуститься один раз при монтуванні

	return (
		<header className={`header${pathname.length === 1 ? "-without-back" : ""} ${isScrolled ? "scrolled" : ""}`}>
			<div className="container">
				<div className="header__wrapper">
					<Logo />
					<Navigation />
					<Profiler />
				</div>
			</div>
		</header>
	)
}

export default Header
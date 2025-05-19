"use client"
import "../styles/hero.scss"
import CopyString from "../../../ui/CopyString/CopyString"
import { MINECRAFT_URL } from "../../../../constants/config"

const Hero = () => {
	return (
		<section className="home-hero">
			<div className="container">
				<div className="home-hero__wrapper">
					<div className="side">
						<img className="zombie-image" src={"/assets/images/zombie.webp"} alt="zombie-image" width={256} height={365} />
					</div>
					<div className="side">
						<span>Сезон #3</span>
						<h1>Forze Space</h1>
						<p>Найкращий майнкрафт сервер</p>
						<CopyString string={MINECRAFT_URL} />
					</div>
					<div className="side">
						<img className="hero-image" src={"/assets/images/hero.webp"} alt="hero-image" width={400} height={504} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero

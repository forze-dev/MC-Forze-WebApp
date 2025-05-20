import "../styles/parts.scss"

const Parts = () => {

	return (
		<section className="Parts">
			<div className="container">
				<h2>Світові переосмислення</h2>
				<p className="subtitle">У новому сезоні ми розділили пригоду на три частини — кожна з яких трансформує окрему складову світу Minecraft.</p>
				<div className="Parts__wrapper">
					<div className="Parts__card">
						<img className="Parts__card-img" src="/assets/icons/world.svg" alt="World" />
						<h3><span>Частина 1 </span><br /><br /> Світ, Яким Ти Його Не Знав</h3>
						<p>Світ змінюється на очах — нові структури, боси, аномальні явища та несподівані сюрпризи навіть у знайомих місцях. Гравці поступово розширюють межі, змінюючи саму реальність.</p>
					</div>
					<div className="Parts__card locked">
						<img className="Parts__card-img--locked" src="/assets/icons/lock.svg" alt="LOCKED" />
					</div>
					<div className="Parts__card locked">
						<img className="Parts__card-img--locked" src="/assets/icons/lock.svg" alt="LOCKED" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Parts
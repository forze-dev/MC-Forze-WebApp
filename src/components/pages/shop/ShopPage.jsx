import Catalog from "./sections/Catalog"
import SEOHelmet from "../../common/SEOHelmet/SEOHelmet"

const ShopPage = () => {

	return (
		<>
			<SEOHelmet
				title={"Майнкрафт сервер Forze Space — Бонуси та ексклюзивні предмети"}
				canonical={"https://forze.space/shop"}
				description={"Підтримай сервер Forze Space та отримай круті бонуси! Відкривай донат-кейси, володій ексклюзивними предметами, отримуй VIP-привілеї, внутрішню валюту та інші переваги. Кожна покупка — внесок у розвиток нашого українського серверу та твій шлях до вершини!"}
			/>
			<main id="home">
				<Catalog />
			</main>
		</>
	)
}

export default ShopPage
import Hero from "./sections/Hero"
import Parts from "./sections/Parts"
import Admins from "./sections/Admins"
import SEOHelmet from "../../common/SEOHelmet/SEOHelmet"

const HomePage = () => {

	return (
		<>
			<SEOHelmet />
			<main id="home">
				<Hero />
				<Parts />
				<Admins />
			</main>
		</>
	)
}

export default HomePage
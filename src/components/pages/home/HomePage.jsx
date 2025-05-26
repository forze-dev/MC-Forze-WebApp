import Hero from "./sections/Hero"
import Parts from "./sections/Parts"
import Admins from "./sections/Admins"

const HomePage = () => {

	return (
		<main id="home">
			<Hero />
			<Parts />
			<Admins />
		</main>
	)
}

export default HomePage
import { Link } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"

const Logo = () => {

	return (
		<div className="logo">
			<Link to={ROUTES.HOME}>
				FORZE SPACE
			</Link>
		</div>
	)
}

export default Logo
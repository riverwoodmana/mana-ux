import { Navigation } from "./Navigation"
import { Link } from "react-router-dom"

export const Header = (props) => {
  return (
    <header className="mana-header">
        <Link to="/" className="homeButton"><h1>{props.title}</h1></Link>
        <Navigation />
    </header>
    
  )
}

Header.defaultProps = {
    title: "Riverwood Meal Train"
}

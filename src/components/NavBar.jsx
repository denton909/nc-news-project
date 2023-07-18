import { Link } from "react-router-dom"

const Navbar = () => {
    return <nav id="NavBar">
        <Link to="/" className="link">Home</Link>
        <a className="link">Cooking</a>
        <a className="link">Coding</a>
        <a className="link">Football</a>
    </nav>
}

export default Navbar
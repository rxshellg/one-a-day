import './NavBar.css'
import Logo from "../assets/OneADay.png"

const NavBar = () => {
    return (
        <>
            <div className="navbar-container">
                    <img src={Logo} alt="One A Day's logo" />
            </div>
        </>
    )
}

export default NavBar;
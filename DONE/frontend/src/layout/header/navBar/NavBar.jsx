import React from "react"
import "./navBar.css"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BsToggleOff } from "react-icons/bs"
import { BsToggleOn } from "react-icons/bs"
import { BiMoon } from "react-icons/bi"
import { BsSun } from "react-icons/bs"
import { GrSearch } from "react-icons/gr"
import { useNavigate } from "react-router-dom"
import { DarkModeContext } from "../../../providers/DarkModeProvider"
import MenuIcon from '@mui/icons-material/Menu'
import AppMenu from '../../../components/common/AppMenu'
import SelfArea from '../SelfArea'
import { getUser as getStoredUser } from '../../../api/user'
import Paths from "../../../utils/Paths"

const NavBar = (props) => {
  const [crrUser, setCrrUser] = React.useState(undefined)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { darkMode, toggleDarkMode } = React.useContext(DarkModeContext)
  const [activeTab, setActiveTab] = React.useState("All Tasks")

  React.useEffect(() => {
    if (!props.users.length || crrUser) return

    const user = getStoredUser()

    const foundedUser = props.users.find(u => u.email === user.email)

    setCrrUser(foundedUser)
  }, [props.users, crrUser])


  const navigate = useNavigate()

  const logoSrc = darkMode ? "/img/done-logoDark.png" : "/img/done-logo.png"

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleOpenMenu = () => {
    setIsMenuOpen(true)
  }

  return (
    <>
      <div className="nav-design">
        <nav
          className={` navbar ${darkMode ? "dark-mode" : ""} navbar-expand-lg`}
        >
          <div className="container-fluid m-3">

            {crrUser && <MenuIcon style={{ marginRight: '4%', cursor: 'pointer' }} onClick={toggleOpenMenu} />}

            <img src={logoSrc} width="120px" alt="logo" />

            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="search-container">
                <form className="d-flex" role="search">
                  <GrSearch
                    size={"20"}
                    style={{ marginTop: 10, marginRight: 20 }}
                  />
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder={"Search"}
                    size={60}
                    aria-label="Search"
                  />
                </form>
              </div>
              <div className="links-container">

                <ul className="navbar-nav mb-2 mb-lg-0 px-3">

                  <li className="nav-item px-2">
                    <button
                      className={`design ${darkMode ? "dark-mode" : ""}`}
                      onClick={toggleDarkMode}
                    >
                      <BsSun style={{ marginRight: 3 }} />
                      {darkMode ? (
                        <BsToggleOn size={"25"} />
                      ) : (
                        <BsToggleOff size={"25"} />
                      )}
                      <BiMoon style={{ marginLeft: 2 }} />
                    </button>
                  </li>

                  <li className="nav-item px-2">
                    <button
                      className={`nav-link  ${darkMode ? "dark-mode" : ""} ${activeTab === "about" ? "active" : ""
                        }`}
                      onClick={() => {
                        navigate(Paths.ABOUT)
                        setActiveTab("about")
                      }}
                    >
                      <AiOutlineInfoCircle size={"25"} /> About
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <AppMenu openMenu={isMenuOpen} close={closeMenu} menuBody={<SelfArea user={crrUser} />} />
    </>
  )
}

export default NavBar

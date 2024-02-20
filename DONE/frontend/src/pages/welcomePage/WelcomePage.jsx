import React from "react"
import "./welcomePage.css"
import { useNavigate } from "react-router-dom"
import Paths from "../../utils/Paths"
import { getUser as getStoredUser } from "../../api/user"

const WelcomePage = () => {
  const navigate = useNavigate()


  React.useEffect(() => {
    const user = getStoredUser()

    if (user) {
      navigate(Paths.HOME)
    }

  }, [])


  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src="/img/done-logo.png" width="440px" alt="logo" />
        </div>
        <div className="welcomeContainer">
          <div>
            <h1 className="title">
              Welcome to<span className="strong"> DONE</span>
            </h1>
            <p className="subTitle">
              The only place where your things will be done
            </p>
          </div>
          <div className="buttonContainer">
            <button
              type="button"
              size="lg"
              className="welcomeButton"
              onClick={() => navigate(Paths.LOGIN)}
            >
              Log In
            </button>

            <button
              type="button"
              size="lg"
              className="welcomeButton"
              onClick={() => navigate(Paths.SIGN_UP)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePage

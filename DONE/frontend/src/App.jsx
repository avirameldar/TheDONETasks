
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { DarkModeProvider } from "./providers/DarkModeProvider"
import Login from './Users/pages/Login'
import Dashboard from './screens/Dashboard'
import SignUp from './Users/pages/SignUp'
import "./css/App.css"
import AboutPage from "./pages/aboutPage/AboutPage"
import WelcomePage from './pages/welcomePage/WelcomePage'
import Footer from "./layout/footer/Footer"
import SessionTimeout from "./components/SessionTimeout"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<WelcomePage />)
    },
    {
      path: "/login",
      element: (<Login />)
    },

    {
      path: "/sign-up",
      element: (<SignUp />)
    },
    {
      path: "home",
      element: (<Dashboard />)
    },
    {
      path: "about",
      element: (<AboutPage />)
    },
  ])

  return (
    <div className="body">
      <DarkModeProvider>
        <RouterProvider router={router} />
        <SessionTimeout />
        <Footer />
      </DarkModeProvider>
    </div>
  )
}

export default App

import "./login.css"
import { FaLock } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Joi from "joi"
import Input from "../components/input"
import { validateFormikUsingJoi } from "../../utils/validateFormikUsingJoi"
import { useState } from "react"
import Paths from '../../utils/Paths'
import { login as loginReq } from '../../api/user'

const Login = () => {
  const [serverError, setServerError] = useState("")
  const navigate = useNavigate()

  const goSign = () => {
    navigate(Paths.SIGN_UP)
  }

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateFormikUsingJoi({
      email: Joi.string()
        .min(2)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024)/*.pattern('())!@%$#^&*-_*')*/.required(),
    }),

    async onSubmit(values) {
      try {
        await loginReq(values)

        navigate(Paths.HOME)

      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data)
        }
      }
    },
  })

  return (
    <div className="wrapper">

      <div className="formContainer">
        <div className="logo">
          <img src="/img/done-logo.png" width="240px" alt="logo" />
        </div>
        {serverError && <div className="error">{serverError}</div>}

        <form onSubmit={form.handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <Input
              {...form.getFieldProps("email")}
              type="email"
              placeholder="Your email"
              required
              error={form.touched.email && form.errors.email}
            />
            <MdOutlineEmail className="email-icon" />
          </div>
          <div className="input-box">
            <Input
              {...form.getFieldProps("password")}
              type="password"
              placeholder="Your Password"
              required
              error={form.touched.password && form.errors.password}
            />
            <FaLock className="icon" />
          </div>

          <button
            disabled={!form.isValid}
            className="the-form-btn"
            onClick={form.onSubmit}
            type="submit"
          >
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have account? <span onClick={goSign} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign up</span>
            </p>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Login

import React, { useState } from "react"
import "./signUp.css"
import { validateFormikUsingJoi } from "../../utils/validateFormikUsingJoi"
import { FaUser, FaLock } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Joi from "joi"
import Input from "../components/input"
import { register } from '../../api/user'
import Paths from '../../utils/Paths'
const passwordRegex = new RegExp("[!@%$#^&*-_*(]")
const SignUp = () => {
  const [serverError, setServerError] = useState("")
  const navigate = useNavigate()

  const goLogin = () => {
    navigate(Paths.LOGIN)
  }

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: validateFormikUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(2)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(8).max(1024).pattern(passwordRegex).required(),
    }),

    async onSubmit(values) {
      try {

        await register({ ...values, premiumUser: false })

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
        <form onSubmit={form.handleSubmit}>
          {serverError && (
            <div className="alert alert-danger">{serverError}</div>
          )}

          <h1>Sign up</h1>
          <div className="input-box">
            <Input
              {...form.getFieldProps("name")}
              type="text"
              placeholder="Full Name"
              required
              error={form.touched.name && form.errors.name}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <Input
              {...form.getFieldProps("email")}
              type="Email"
              placeholder="Your active email address"
              required
              error={form.touched.email && form.errors.email}
            />
            <MdOutlineEmail className="email-icon" />
          </div>

          <div className="input-box">
            <Input
              {...form.getFieldProps("password")}
              type="password"
              placeholder="Password"
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
            Sign up
          </button>
          <div className="register-link">
            <p>
              Already have account? <span onClick={goLogin} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Login</span>
            </p>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default SignUp

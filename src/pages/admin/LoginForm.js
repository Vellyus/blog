import { useState } from "react"
import { login } from "../../service/authService"
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext"
import { useNavigate } from "react-router-dom"

export function LoginForm({ changeForm }) {
  const [formState, setFormState] = useState()

  const isLoggedIn = useLoginContext()
  const toggleisLoggedIn = useLoginUpdateContext()

  const navigate = useNavigate()

  const handleNavToMainPage = () => {
    navigate(`/`, { replace: true })
  }

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleLoginUser = (event) => {
    event.preventDefault()
    login(formState.email, formState.password).then(user => {
      if (user) {
        setFormState(null)
        toggleisLoggedIn()
        navigate("/admin/blog", { replace: true })
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <h2>Sign in!</h2>
      <form onSubmit={handleLoginUser}>
        <label htmlFor="email">
          <input onChange={handleInputChange} type="email" name="email" id="email" placeholder="E-mail" />
        </label>

        <label htmlFor="password">
          <input onChange={handleInputChange} type="password" name="password" id="password" placeholder="Password" />
        </label>

        <button type="submit">Sign in!</button>
      </form>

      <hr></hr>

      <button onClick={changeForm}>Don't have an account yet?</button>
      <button className="backHome" onClick={handleNavToMainPage}>Home</button>

    </>
  )
}
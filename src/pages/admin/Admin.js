import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

export function Admin() {
  const [formState, setFormState] = useState("login")

  const handleFormState = () => {
    setFormState(state => state === "login" ? "register" : "login")
  }

  return (
    <main>
      <h1>Admin</h1>

      {formState === "login" ?
        (<LoginForm changeForm={handleFormState} />) :
        (<RegisterForm changeForm={handleFormState} />)}
    </main>
  )
}
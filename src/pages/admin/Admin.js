import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function Admin() {
  const [formState, setFormState] = useState("register");

  const handleFormState = () => {
    setFormState(state => state === "login" ? "register" : "login");
  };

  return (
    <>
      <h1>Admin</h1>

      { formState === "login" ?
        (<LoginForm changeForm={ handleFormState } />) :
        (<RegisterForm changeForm={ handleFormState } />) }
    </>
  );
}
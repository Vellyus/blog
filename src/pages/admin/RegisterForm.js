import { useState } from "react";
import { register, login, logout } from "../../service/authService";

export function RegisterForm({ changeForm }) {
  const [formState, setFormState] = useState();

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleRegisterUser = (event) => {
    event.preventDefault();
    register(formState.email, formState.password);
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="email">
          <input onChange={ handleInputChange } type="email" name="email" id="email" placeholder="E-mail" />
        </label>

        <label htmlFor="password">
          <input onChange={ handleInputChange } type="password" name="password" id="password" placeholder="Password" />
        </label>

        <button onSubmit={ handleRegisterUser } type="submit">Submit</button>
      </form>

      <hr></hr>

      <button onClick={ changeForm }>I already have an account</button>
    </>
  );
}
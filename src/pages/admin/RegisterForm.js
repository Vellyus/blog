import { useEffect, useRef, useState } from "react";
import { register, login, logout } from "../../service/authService";

export function RegisterForm({ changeForm }) {
  const [formState, setFormState] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleRegisterUser = (event) => {
    event.preventDefault();
    register(formState.email, formState.password);
    setFormState(null);
    emailRef.current.value = null;
    passwordRef.current.value = null;
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={ handleRegisterUser }>
        <label htmlFor="email">
          <input onChange={ handleInputChange } type="email" name="email" id="email" placeholder="E-mail" ref={ emailRef } />
        </label>

        <label htmlFor="password">
          <input onChange={ handleInputChange } type="password" name="password" id="password" placeholder="Password" ref={ passwordRef } />
        </label>

        <button type="submit">Submit</button>
      </form>

      <hr></hr>

      <button onClick={ changeForm }>I already have an account</button>
    </>
  );
}
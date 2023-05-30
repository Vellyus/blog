import { useState } from "react";

export function RegisterForm({ changeForm }) {
  const [formState, setFormState] = useState();

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="email">
          <input onChange={ handleInputChange } name="email" id="email" placeholder="E-mail" />
        </label>

        <label htmlFor="password">
          <input onChange={ handleInputChange } name="password" id="password" placeholder="Password" />
        </label>

        <button type="submit">Submit</button>
      </form>

      <hr></hr>

      <button onClick={ changeForm }>I already have an account</button>
    </>
  );
}
import { useState } from "react";

export function LoginForm({ changeForm }) {
  const [formState, setFormState] = useState();

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h2>Sign In</h2>
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

      <button onClick={ changeForm }> I don't have an account</button>
    </>
  );
}
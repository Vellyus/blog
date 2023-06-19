import { useState } from "react";
import { register } from "../../service/authService";
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext";
import { useNavigate } from "react-router-dom";

export function RegisterForm({ changeForm }) {
  const [formState, setFormState] = useState();

  const isLoggedIn = useLoginContext();
  const toggleisLoggedIn = useLoginUpdateContext();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleRegisterUser = (event) => {
    event.preventDefault();
    register(formState.email, formState.password).then((user) => {
      if (user) {
        setFormState(null);
        toggleisLoggedIn();
        navigate("/admin/blog", { replace: true });
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={ handleRegisterUser }>
        <label htmlFor="email">
          <input onChange={ handleInputChange } type="email" name="email" id="email" placeholder="E-mail" />
        </label>

        <label htmlFor="password">
          <input onChange={ handleInputChange } type="password" name="password" id="password" placeholder="Password" />
        </label>

        <button type="submit">Submit</button>
      </form>

      <hr></hr>

      <button onClick={ changeForm }>I already have an account</button>
    </>
  );
}
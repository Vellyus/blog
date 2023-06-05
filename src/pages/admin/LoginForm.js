import { useState, useRef, useEffect } from "react";
import { login } from "../../service/authService";
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext";
import { useNavigate } from "react-router-dom";

export function LoginForm({ changeForm }) {
  const [formState, setFormState] = useState();

  const isLoggedIn = useLoginContext();
  const toggleisLoggedIn = useLoginUpdateContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleLoginUser = (event) => {
    event.preventDefault();
    login(formState.email, formState.password).then(user => {
      if (user) {
        setFormState(null);
        emailRef.current.value = null;
        passwordRef.current.value = null;
        toggleisLoggedIn();
        navigate("/admin/blog", { replace: true });
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={ handleLoginUser }>
        <label htmlFor="email">
          <input onChange={ handleInputChange } type="email" name="email" id="email" placeholder="E-mail" ref={ emailRef } />
        </label>

        <label htmlFor="password">
          <input onChange={ handleInputChange } type="password" name="password" id="password" placeholder="Password" ref={ passwordRef } />
        </label>

        <button type="submit">Submit</button>
      </form>

      <hr></hr>

      <button onClick={ changeForm }> I don't have an account</button>
    </>
  );
}
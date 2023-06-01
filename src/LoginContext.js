import { createContext, useContext, useState } from "react";

const LoginContext = createContext();
const LoginUpdateContext = createContext();

export function useLoginContext() {
  return useContext(LoginContext);
}

export function useLoginUpdateContext() {
  return useContext(LoginUpdateContext);
}

export function LoginProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  function toggleLoggedIn() {
    setIsUserLoggedIn(state => !state);
  }

  return (
    <LoginContext.Provider value={ isUserLoggedIn }>
      <LoginUpdateContext.Provider value={ toggleLoggedIn }>
        { children }
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
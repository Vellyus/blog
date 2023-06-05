import { logout } from "../../service/authService";
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function AdminBlog() {

  const isLoggedIn = useLoginContext();
  const toggleisLoggedIn = useLoginUpdateContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      toggleisLoggedIn();
    });
  };

  useEffect(() => {
    !isLoggedIn && navigate("/admin", { replace: true });
  });

  return (
    <>
      <h1>AdminBlog</h1>
      <button onClick={ handleLogout }>Logout</button>
    </>
  );
}
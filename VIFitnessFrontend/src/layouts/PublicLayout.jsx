import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function PublicLayout() {
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/user" />;
  }

  const SignInAction = () => {
    login(true);
  };

  return (
    <>
      <h1>This is Unprotected Layout</h1>
      <button onClick={SignInAction}>Sign in</button>
      <Outlet />
    </>
  );
}

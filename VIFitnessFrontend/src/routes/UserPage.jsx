import { Outlet } from "react-router-dom";

export default function UserPage() {
  return (
    <>
      <div className="user-page-wrapper">
        <h1>Redirects to this page after logging in</h1>
        <Outlet />
      </div>
    </>
  );
}

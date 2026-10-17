import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-muted">
      <div className="w-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

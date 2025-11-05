import { Outlet } from "react-router-dom";
import { MainNavigation } from "../component/MainNavigation";
export const UserNav = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

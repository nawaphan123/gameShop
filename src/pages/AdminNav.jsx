import { Outlet } from "react-router-dom";
import { AdminNavigation } from "../component/AdminNavigation";
export const AdminNav = () => {
  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  );
};

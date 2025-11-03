import React from "react";
import { Outlet } from "react-router-dom";
import { MainNavigation } from "../component/MainNavigation";
export const Root = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

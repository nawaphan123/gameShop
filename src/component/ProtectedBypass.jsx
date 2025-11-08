import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const ProtectedBypass = ({ children }) => {
  const [isAllow, setAllow] = useState(null);
  useEffect(() => {
    async function checkPermission() {
      const res = await axios.get("http://localhost:3000/checkPermission", {
        withCredentials: true,
      });
      console.log(res.data.status);
      setAllow(res.data.status);
    }
    checkPermission();
  }, []);
  if (isAllow === null) {
    return <p>Loading...</p>; // หรือ spinner
  }

  // ถ้าไม่มีสิทธิ์ → redirect ไป login
  if (!isAllow) {
    return <Navigate to="/login" replace />;
  }

  // ถ้ามีสิทธิ์ → render children
  return <>{children}</>;
};

import React from "react";
import Errorr from "./Rrrorr";


function ProtectedRoute({ userRole, allowedRoles, children }) {
  // لو مفيش قيود على الصفحة، اسمح بالدخول
  if (!allowedRoles || allowedRoles.length === 0) return children;

  if (allowedRoles.includes(userRole)) {
    return children;
  }

  return <Errorr />;
}

export default ProtectedRoute;

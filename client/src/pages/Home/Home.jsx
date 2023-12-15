import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  if (!localStorage.getItem("jwToken")) {
    return <Navigate to="/login" />;
  }
  return <div>Home</div>;
}

export default Home;

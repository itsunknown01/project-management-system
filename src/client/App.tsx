import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "@/pages/auth/login";
import { useAuthStore } from "./hooks/auth/use-auth";
import Register from "./pages/auth/register";
import Home from "./pages/dashboard/home";

function App() {
  const { token, loading, initialise } = useAuthStore();

  useEffect(() => {
    initialise();
    console.log("useEffect")
  }, [initialise]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          loading ? (
            <div>Loading...</div>
          ) : token ? (
            <Home />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
    </Routes>
  );
}

export default App;

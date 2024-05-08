import Login from "@/pages/auth/login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register";
import Home from "./pages/dashboard/home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

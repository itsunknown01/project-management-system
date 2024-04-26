import Login from "@/pages/auth/login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register";

function App() {
  return (
    <Routes>
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

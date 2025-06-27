import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

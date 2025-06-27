import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Reegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Redirige la racine vers /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Page 404 simple */}
        <Route path="*" element={<h2>Page non trouvée</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

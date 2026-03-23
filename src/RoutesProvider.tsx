import { Routes, Route } from "react-router-dom";

import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { UserPage } from "./pages/UserPage";

function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-page" element={<UserPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { RoutesProvider };

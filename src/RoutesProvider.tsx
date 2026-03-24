import { Routes, Route } from "react-router-dom";

import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/user/Dashboard";
import { UserPage } from "./pages/UserPage";
import { UserEdit } from "./pages/UserEdit";

function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<UserPage />} />
        <Route path="edit" element={<UserEdit />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { RoutesProvider };

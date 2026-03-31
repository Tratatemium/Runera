import { Routes, Route } from "react-router-dom";

import { PageLayout } from "./components/layout/";
import { RequireAuth } from "./components/RequireAuth";

import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

import { Dashboard } from "./pages/user/Dashboard";
import { UserInfo } from "./pages/user/UserInfo";
import { EditAccount } from "./pages/user/EditAccount";
import { EditProfile } from "./pages/user/EditProfile";
import { MyRuns } from "./pages/user/MyRuns";

function RoutesProvider() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="info" element={<UserInfo />} />
          <Route path="edit-account" element={<EditAccount />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="runs" element={<MyRuns />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { RoutesProvider };

import { Routes, Route } from "react-router-dom";

import { PageLayout, UserPagesLayout } from "./components/layout/";
import { RequireAuth } from "./components/auth";

import { NotFound, Home, Login, Signup } from "./pages/";

import { Dashboard, UserInfo, EditAccount, EditProfile } from "./pages/user/";
import { MyRuns, RunFormPage } from "./pages/runs";

function RoutesProvider() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<RequireAuth />}>
          <Route element={<UserPagesLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="info" element={<UserInfo />} />
            <Route path="edit-account" element={<EditAccount />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="runs">
              <Route index element={<MyRuns />}></Route>
              <Route path="new" element={<RunFormPage />} />
              <Route path=":runId/edit" element={<RunFormPage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { RoutesProvider };

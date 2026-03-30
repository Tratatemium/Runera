import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useUser } from "../hooks/useUser";
import { mapUserResponseToState } from "../utils/user.utils";
import { useEffect, useState } from "react";

function RequireAuth() {
  const { user, loginUser } = useAuthContext();
  const location = useLocation();
  const { getMe } = useUser();

  const [checking, setChecking] = useState(!user);

  useEffect(() => {
    if (user) return;

    let mounted = true;

    (async () => {
      try {
        const userData = await getMe();
        if (mounted) {
          loginUser(mapUserResponseToState(userData));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setChecking(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user, getMe, loginUser]);

  if (checking) {
    return null; // or spinner
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export { RequireAuth };

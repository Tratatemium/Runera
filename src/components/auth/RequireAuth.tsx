import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUser } from "../../hooks/useUser";
import { mapUserResponseToState } from "../../utils/user.utils";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";

function RequireAuth() {
  const { user, loginUser } = useAuthContext();
  const location = useLocation();
  const { getMe } = useUser();

  const [checking, setChecking] = useState(!user);

  useEffect(() => {
    if (user) return;
    let mounted = true;

    async function fetchUser() {
      try {
        const userData = await getMe({ suppressUnauthorized: true });
        if (!mounted) return;
        loginUser(mapUserResponseToState(userData));
      } catch (err) {
        // Expected: user not authenticated, nothing to do
      } finally {
        if (mounted) setChecking(false);
      }
    }

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [user, getMe, loginUser]);

  if (checking) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export { RequireAuth };

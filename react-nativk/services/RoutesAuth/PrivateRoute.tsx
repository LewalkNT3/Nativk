import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children?: ReactNode;
}

function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    const checkAuth = async () => {
      if (isClient) {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [isClient]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace />
  );
}

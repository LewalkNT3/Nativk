import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import HandleLogout from "~/api/auth/HandleLogut";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function PaginaPruebas() {
  const [user, setUser] = useState<{
    email?: string;
    first_name?: string;
    last_name?: string;
  }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedUser);
    }
  }, []);

  if (!user.email) {
    return <p>No se ha iniciado sesión</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <h2 className="text-xl font-bold">Bienvenido, {user.first_name}</h2>
      <p>Email: {user.email}</p>
      <p>
        Nombre: {user.first_name} {user.last_name}
      </p>
      <HandleLogout />
    </main>
  );
}

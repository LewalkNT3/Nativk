import { useEffect, useRef, useState } from "react";
import useAuth from "../../services/Authentication/useAuth";
import { useLogout } from "../../services/Authentication/useLogout";

import { User } from "@deemlol/next-icons";
import { LogOut } from "@deemlol/next-icons";

export default function NavbarSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const { handleLogout } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="sticky top-0 flex gap-28 w-full items-center justify-center bg-transparent p-3 ">
      <div>
        <a href="/" className="text-3xl font-extrabold">
          Ntv
        </a>
      </div>
      <div className="flex flex-row justify-between gap-10 text-lg">
        <a
          className="hover:border-b-sky-600 hover:border-b transition-all"
          href="/tasks"
        >
          Tasks
        </a>
        <a
          className="hover:border-b-sky-600 hover:border-b transition-all"
          href="/measurements"
        >
          Measurement
        </a>
        <a
          className="hover:border-b-sky-600 hover:border-b transition-all"
          href="/pagina-prueba"
        >
          Pruebas
        </a>
      </div>
      <div className="flex flex-row gap-5 items-center">
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center w-10 h-10  text-white bg-indigo-500 rounded-full"
            >
              {getInitials(user.first_name, user.last_name)}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 p-8 w-[350px] bg-white shadow-lg rounded-lg ">
                <ul className="py-2 flex flex-col gap-5 ">
                  <li className="text-3xl flex flex-col  ">
                    Bienvenido,
                    <strong className="text-sky-600">
                      {" "}
                      {user.first_name} {user.last_name}!
                    </strong>
                  </li>
                  <div className="w-300px bg-gray-400 h-[1px]"></div>
                  <li className="items-center  hover:bg-gray-100 cursor-pointer text-xl rounded p-2 font-semibold flex flex-row gap-2">
                    <User />
                    <a href="/profile">Perfil</a>
                  </li>
                  <div className="w-300px bg-gray-200 h-[1px]"></div>
                  <button
                    className="flex flex-row gap-2 hover:bg-red-50 rounded cursor-pointer text-red-600 text-xl p-2 font-semibold"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    Cerrar Sesion
                  </button>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <a className="font-bold hover:text-blue-500" href="/login">
              Login
            </a>
            <a className="font-bold hover:text-blue-500" href="/register">
              Register
            </a>
          </>
        )}
      </div>
    </header>
  );
}

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLogout } from "~/api/auth/HandleLogut";

interface User {
  first_name: string;
  last_name: string;
}

export default function NavbarSection() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { handleLogout } = useLogout();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/profile/",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, []);

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

  return (
    <header className="sticky top-0 flex justify-between items-center bg-transparent p-4 mx-30">
      <div>
        <p className="text-2xl font-black">Nativk</p>
      </div>
      <div className="flex flex-row gap-5 items-center">
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center w-12 h-12 text-xl text-white bg-indigo-500 rounded-full"
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
                    <img
                      src="./profile.svg"
                      className="w-5 h-5 text-red-600 "
                      alt=""
                    />
                    <a href="/profile">Perfil</a>
                  </li>
                  <div className="w-300px bg-gray-200 h-[1px]"></div>
                  <button
                    className="flex flex-row gap-2 hover:bg-red-50 rounded cursor-pointer text-red-600 text-xl p-2 font-semibold"
                    onClick={handleLogout}
                  >
                    <img
                      src="./logout-svgrepo-com.svg"
                      className="w-6 h-6 text-red-600"
                      alt=""
                    />
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

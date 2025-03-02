import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../services/Authentication/LoginAuth";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation<void, Error, typeof formData>({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      console.log("Usuario autenticado", data);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Inicio Exitoso");
      navigate("/measurements");
    },
    onError: (error: any) => {
      console.error("error al iniciar sesion", error);
      toast.error("Error al iniciar sesion, revise los datos enviados");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section className="flex justify-center p-10 text-black">
      <div>
        <div className="bg-amber-50 max-w-[950px] max-h-[700px]  rounded-2xl shadow-2xl flex flex-row">
          <div className="w-[60%] flex justify-center items-center flex-col">
            <div className="">
              <h2 className="font-black text-5xl">Login</h2>
            </div>
            <form
              className="flex flex-col w-full p-10 "
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1 pt-3">
                <span className="font-bold ">Email</span>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className="bg-gray-200 rounded p-2 "
                  placeholder="JohnDoe@example.com"
                />
              </div>
              <div className="flex flex-col gap-1 pt-3">
                <span className="font-bold ">Username</span>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  className="bg-gray-200 rounded p-2"
                  placeholder="JohnDoe"
                />
                <div className="flex flex-col gap-1 pt-3 ">
                  <span className="font-bold">Password</span>
                  <input
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="bg-gray-200 rounded p-2 w-full "
                    placeholder="SecurePassword1234"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center self-center">
                <button
                  type="submit"
                  className="p-3 bg-blue-700 rounded-4xl text-white w-[250px] mt-5 hover:bg-blue-600 cursor-pointer"
                >
                  Iniciar Sesion
                </button>
              </div>
              <p className="self-center p-3 ">
                No tenes cuenta?{" "}
                <a href="/register" className="hover:text-blue-600">
                  Registrate
                </a>
              </p>
            </form>
          </div>
          <div className="flex items-center justify-center w-[50%] p-0">
            <img
              src="../src/assets/Mountain.jpg"
              alt="Mountain"
              className="object-cover h-full w-full  m-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

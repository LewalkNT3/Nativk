import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser } from "~/api/auth";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const mutation = useMutation<void, Error, typeof formData>({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      console.log("Usuario autenticado", data);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Inicio exitoso");
    },
    onError: (error) => {
      console.error("error al iniciar sesion", error);
      alert("Error al iniciar sesion");
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
    <section className="flex justify-center  items-center h-screen text-black">
      <div className="bg-amber-50 p-7 w-[560px] rounded-2xl shadow-2xl">
        <div>
          <h2 className="font-semibold text-6xl">Login</h2>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 pt-3">
            <span>Email</span>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="bg-gray-200 rounded p-2"
              placeholder="JohnDoe@example.com"
            />
          </div>
          <div className="flex flex-col gap-1 pt-3">
            <span>Username</span>
            <input
              value={formData.username}
              onChange={handleChange}
              name="username"
              type="text"
              className="bg-gray-200 rounded p-2"
              placeholder="JohnDoe"
            />
            <div className="flex flex-col gap-1 pt-3 ">
              <span>Password</span>
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
          <button
            type="submit"
            className="p-3 bg-blue-700 rounded-4xl text-white w-full mt-5 hover:bg-blue-600 cursor-pointer"
          >
            Iniciar Sesion
          </button>
          <p className="self-center p-3">
            No tenes cuenta?{" "}
            <a href="/register" className="hover:text-blue-600">
              Registrate
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

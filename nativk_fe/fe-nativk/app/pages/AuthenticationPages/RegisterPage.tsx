import { useMutation } from "@tanstack/react-query";
import { registerUser } from "~/api/auth";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    dni: "",
    phone: "",
    password: "",
  });

  const mutation = useMutation<void, Error, typeof formData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Usuario registrado", data);
      alert("Registrado correctamente");
    },
    onError: (error) => {
      console.error("Error al registrarse", error);
      alert("Error al registrarse");
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
          <h2 className="font-semibold text-6xl">Register</h2>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 pt-3">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-200 rounded p-2"
              placeholder="JohnDoe@example.com"
            />
          </div>
          <div className="flex flex-col gap-1 pt-3">
            <span>Username</span>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              className="bg-gray-200 rounded p-2"
              placeholder="JohnDoe"
            />
            <div className="flex flex-col gap-1 pt-3 ">
              <span>Password</span>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="bg-gray-200 rounded p-2 w-full "
                placeholder="SecurePassword1234"
              />
              {/* <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-1 pt-3">
                <span>Repeat Password</span>
                <input
                  type="text"
                  className="bg-gray-200 rounded p-2 w-full"
                  placeholder="SecurePassword1234"
                />
              </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-3">
            <span>First Name</span>
            <input
              className="bg-gray-200 rounded p-2"
              type="text"
              name="first_name"
              placeholder="Nombre"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 pt-3">
            <span>LastName</span>
            <input
              type="text"
              name="last_name"
              placeholder="Apellido"
              value={formData.last_name}
              onChange={handleChange}
              className="bg-gray-200 rounded p-2"
            />
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-1 pt-3">
              <span>DNI (Opcional)</span>
              <input
                className="bg-gray-200 rounded p-3"
                type="text"
                name="dni"
                placeholder="DNI"
                value={formData.dni}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 pt-3">
              <span>Phone (Opcional)</span>
              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-200 rounded p-3"
              />
            </div>
          </div>
          <button
            type="submit"
            className="p-3 bg-blue-700 rounded-4xl text-white w-full mt-5 hover:bg-blue-600 cursor-pointer"
          >
            Registrarse
          </button>
          <p className="self-center p-3">
            Ya tenes una cuenta?{" "}
            <a href="" className="hover:text-blue-600">
              Inicia Sesion
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

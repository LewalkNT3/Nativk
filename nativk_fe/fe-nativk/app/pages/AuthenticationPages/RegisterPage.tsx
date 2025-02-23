import { useMutation } from "@tanstack/react-query";
import { registerUser } from "~/api/auth";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

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

    if (formData.password !== confirmPassword) {
      setError("Las contrasena no coinciden");
      return;
    }

    setError("");

    mutation.mutate(formData);
  };

  return (
    <section className="flex justify-center p-10 text-black">
      <div>
        <div className="bg-amber-50 max-w-[975px] max-h-[700px]  rounded-br-none rounded-2xl shadow-2xl flex flex-row ">
          <div className="flex items-center justify-center w-[100%] p-0">
            <img
              src="./Mountain2.jpg"
              alt="Mountain"
              className="object-cover h-full w-full  rounded-bl-2xl m-32"
            />
          </div>
          <div className="w-[60%] flex justify-center items-center flex-col">
            <div className="px-10">
              <h2 className="font-black text-5xl justify">Register</h2>
            </div>
            <form className="flex flex-col px-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 pt-3">
                <span className="font-bold">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-200 rounded p-2"
                  placeholder="JohnDoe@example.com"
                />
              </div>
              <div className="flex flex-row gap-5">
                {" "}
                <div className="flex flex-col gap-1 pt-3">
                  <span className="font-bold">First Name</span>
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
                  <span className="font-bold">LastName</span>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Apellido"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="bg-gray-200 rounded p-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-3">
                <span className="font-bold">Username</span>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-200 rounded p-2"
                  placeholder="JohnDoe"
                />
                <div className="flex flex-col gap-1 pt-3 ">
                  <span className="font-bold">Password</span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="bg-gray-200 rounded p-2 w-full "
                    placeholder="SecurePassword1234"
                  />
                </div>
                <div>
                  <span className="font-bold">Comfirm Password</span>
                  <input
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="bg-gray-200 rounded p-2 w-full "
                    placeholder="Comfirm Password"
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </div>

              <div className="flex flex-col gap-1 pt-3">
                <span className="font-bold">Phone (Opcional)</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-200 rounded p-3"
                />
              </div>

              <div className="flex justify-center items-center self-center">
                <button
                  type="submit"
                  className="p-3 bg-blue-700 rounded-4xl text-white w-[350px] mt-5 hover:bg-blue-600 cursor-pointer"
                >
                  Registrate
                </button>
              </div>
              <p className="self-center p-3">
                Ya tenes una cuenta?{" "}
                <a href="/login" className="hover:text-blue-600">
                  Inicia Sesion
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

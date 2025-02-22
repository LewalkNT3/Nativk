import type { Route } from "../+types/home";
import RegisterPage from "~/pages/AuthenticationPages/RegisterPage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Register",
    },
    {
      name: "description",
      content: "Register user page",
    },
  ];
}

export default function Register() {
  return <RegisterPage />;
}

import type { Route } from "../+types/home";
import LoginPage from "~/pages/AuthenticationPages/LoginPage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Login",
    },
    {
      name: "description",
      content: "Login user page",
    },
  ];
}

export default function Register() {
  return <LoginPage />;
}

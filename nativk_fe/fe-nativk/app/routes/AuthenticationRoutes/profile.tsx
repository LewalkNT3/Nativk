import type { Route } from "../+types/home";
import ProfilePage from "~/pages/AuthenticationPages/ProfilePage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Profile",
    },
    {
      name: "description",
      content: "Profile page",
    },
  ];
}

export default function Register() {
  return <ProfilePage />;
}

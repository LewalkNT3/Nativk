import type { Route } from "../+types/home";
import ProfilePage from "~/pages/AuthenticationPages/ProfilePage";
import PrivateRoute from "PrivateRoute";

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

export default function Profile() {
  return (
    // <PrivateRoute>
    <ProfilePage />
    // </PrivateRoute>
  );
}

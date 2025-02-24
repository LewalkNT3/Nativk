import type { Route } from "../+types/home";
import FoodPage from "~/pages/FoodPages/FoodPage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "foods",
    },
    {
      name: "description",
      content: "Profile foods",
    },
  ];
}

export default function FoodsPage() {
  return <FoodPage />;
}

import type { Route } from "../+types/home";
import MeasurementPage from "~/pages/MeasurementPages/MeasurementPage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "measurement",
    },
    {
      name: "description",
      content: "measurement page",
    },
  ];
}

export default function FoodsPage() {
  return <MeasurementPage />;
}

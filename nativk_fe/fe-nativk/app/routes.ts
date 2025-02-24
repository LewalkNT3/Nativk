import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pagina-prueba", "routes/pagina-pruebas.tsx"),
  route("register", "routes/AuthenticationRoutes/register.tsx"),
  route("login", "routes/AuthenticationRoutes/login.tsx"),
  route("profile", "routes/AuthenticationRoutes/profile.tsx"),
  route("foods", "routes/FoodsRoutes/foods.tsx"),
] satisfies RouteConfig;

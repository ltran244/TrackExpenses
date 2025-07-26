import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("login","routes/auth/auth.tsx"),
  route("home", "routes/home/home.tsx"),
] satisfies RouteConfig;

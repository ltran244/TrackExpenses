import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login","routes/auth/auth.tsx"),
  route("dashboard", "routes/dashboard/dashboard.tsx"),
] satisfies RouteConfig;

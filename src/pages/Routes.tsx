import React from "react";
import { Route, Routes } from "react-router-dom";

const SplashScreen = React.lazy(() => import("./Splashscreen"));
const Login = React.lazy(() => import("./Login"));
const Signup = React.lazy(() => import("./Signup"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const PasswordReset = React.lazy(() => import("./PasswordReset"));
const NotVerified = React.lazy(() => import("./NotVerified"));
const Project = React.lazy(() => import("./Project"));

const routes = [
  {
    path: "/",
    component: <SplashScreen />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/signup",
    component: <Signup />,
  },
  {
    path: "/password-reset",
    component: <PasswordReset />,
  },
  {
    path: "not-verified",
    component: <NotVerified />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
      <Route index element={<Dashboard />} />
      <Route path="home" element={<Dashboard />} />
      <Route path="home/project/:projectId" element={<Project />} />
    </Routes>
  );
};

export default AppRoutes;

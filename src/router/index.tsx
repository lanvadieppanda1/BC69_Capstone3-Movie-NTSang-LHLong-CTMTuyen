import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import {
  FilmDetail,
  Home,
  Login,
  Register,
  AboutUs,
  Category,
  ContacUs,
} from "../pages";
import { AuthLayout, MainLayout } from "../components";

export const routers = () =>
  useRoutes([
    {
      element: <AuthLayout />,
      children: [
        {
          path: PATH.register,
          element: <Register />,
        },
        {
          path: PATH.login,
          element: <Login />,
        },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: PATH.phimDetail,
          element: <FilmDetail />,
        },
        {
          path: PATH.aboutUs,
          element: <AboutUs />,
        },
        {
          path: PATH.danhmuc,
          element: <Category />,
        },
        {
          path: PATH.lienhe,
          element: <ContacUs />,
        },
      ],
    },
  ]);

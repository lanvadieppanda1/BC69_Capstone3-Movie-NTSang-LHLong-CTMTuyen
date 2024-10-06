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
  Profile,
  FilmManagement,
  EditFilm,
} from "../pages";
import { AuthLayout, MainLayout,AdminLayOut } from "../components";
import { EditFilmTemplate } from "../components/templates/EditFilmTemplate";

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
        {
          path: PATH.profile,
          element: <Profile />,
        }
      ],
    },
    {
      element: <AdminLayOut />,
      children: [
        {
          path: PATH.FilmManament,
          element: <FilmManagement />,
        },
        {
          path: PATH.editFilm,
          element: <EditFilm />,
        },
      ],
    },
  ]);

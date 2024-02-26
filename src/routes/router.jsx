import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Main from "../layout/Main";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

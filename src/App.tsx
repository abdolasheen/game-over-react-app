import React from "react";
import Home from "./Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/js/bootstrap.min";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Login/Login";
import Layout from "./Layout/Layout";
import Main from "./Main/Main";
import Register from "./Register/Register";

import UserContextProvider from "./UserContext/UserContext";
import GamesContextProvider from "./GamesContext/GamesContext";
import Games from "./All/Games";
import All from "./All/All";

import Platforms from "./Platforms/Platforms";
import Categories from "./Categories/Categories";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import GameDetails from "./GmeDetails/GameDetails";
import Sort from "./Sort/Sort";
import ErrorPage from "./ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: (
          <GamesContextProvider>
            <Home />
          </GamesContextProvider>
        ),
      },
      {
        path: "game/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <GameDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "games",
        element: (
          <GamesContextProvider>
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          </GamesContextProvider>
        ),
        children: [
          {
            path: "all",
            element: <All />,
          },
          {
            path: "platforms/:platform",
            element: <Platforms />,
          },
          {
            path: "sort/:type",
            element: <Sort />,
          },
          {
            path: "categories/:category",
            element: <Categories />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <GamesContextProvider>
          <RouterProvider router={router} />
        </GamesContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

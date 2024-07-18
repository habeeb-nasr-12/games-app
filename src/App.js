import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AllGames } from "./components/All/AllGames";
import { Gamedetails } from "./components/Gamedetails/Gamedetails";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/main";
import { Notfound } from "./components/Notfound/Notfound";
import { Register } from "./components/Register/Register";
import GamesType from "./components/GamesType/GamesType";

function App() {

 
  

  const router = createHashRouter([
    {
      path: "",
      element: <Main />,
      children: [
      
  
        { path: "games/home", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "/", element: <Home /> },
        { path: "all", element: <AllGames /> },
        { path: "games/Gamedetails/:id", element: <Gamedetails /> },
        {
          path: "game-details",
          element: <GamesType />,
          children: [
            {
              path: ":type",
              children: [{ path: ":specific", element: <GamesType /> }],
            },
          ],
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

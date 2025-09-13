import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/userContext.jsx';
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import './index.css';
import Layout from './layout/Layout.jsx';
import NavBar from './Components/NavBar.jsx';
import Dashboard from './pages/DashBoard.jsx';
import CoinCharts from './pages/CoinCharts.jsx';
import News from './pages/News.jsx';
import Home from './pages/Home.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
  children:[
    {
       path:"navbar",
       element:<NavBar/>
    },
    {
       index:true,
       element:<Dashboard/>
    },
     {
        path: "coins/:id",   
        element: <CoinCharts />
      }, 
      {
       path:"/",
       element:<Home/>
    },
     {
       path:"news",
       element:<News/>
    },
     {
       path:"watchlist",
       element:<Watchlist/>
    },
     {
       path:"profile",
       element:<Profile/>
    },
     { path: "login", element: <Login /> },
    
  ],
},
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
        <WatchlistProvider>
      <RouterProvider router={router} />
      </WatchlistProvider>
    </UserProvider>
  </StrictMode>
);
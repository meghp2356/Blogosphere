import { Provider } from "react-redux";
import store from "./app/store.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Login,SignUp,PostFrom} from "./components/index.js";
import Home from "./pages/Home.jsx";
import UserPost from "./pages/UserPost.jsx";
import Search from "./pages/Search.jsx";
import ReadPost from "./pages/ReadPost.jsx";
import EditFrom from "./pages/EditFrom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:'/userPost',
        element:<UserPost/>,
      },
      {
        path:'/create',
        element:<PostFrom/>,
      },
      {
        path:'/Search',
        element:<Search/>,
      },
      {
        path:'/:slug',
        element:<ReadPost/>,
      },
      {
        path:'/edit/:post',
        element:<EditFrom/>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>
);

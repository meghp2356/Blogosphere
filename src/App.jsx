import { useState } from "react";
import { NavBar } from "./components/index";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import auth from "./services/auth";
import { login, logout } from "./app/userSlice";
import service from "./services/services";
import { setPost } from "./app/PostSlice";
import ReadPost from "./pages/ReadPost";

function App() {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    auth
      .getAccount()
      .then((data) => {
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
        service.listPost().then((data)=>{
          dispatch(setPost(data.documents))
        }).finally(() => setLoad(true));
      })
  



  }, [service.createPost,service.updatePost,service.deletePost]);
  if (load) {
    return (
      <>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </>
    );
  } else {
    return <h1>loading</h1>;
  }
}

export default App;


import { useContext } from "react";
import { BrowserRouter,Navigate,Outlet,Route,Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";

const AppRouter = () => {
  //* 3) consume (tüketme)
  const {currentuser} = useContext(AuthContext)

  const PrivateRouter = () => {
    return (
        currentuser ? <Outlet/> : <Navigate to={"/login"} replace/>
      )
  }
  
  return (
    
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/details/:id" element={<PrivateRouter/>}>
            <Route path="" element={<MovieDetail/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
    
    );
};

export default AppRouter;

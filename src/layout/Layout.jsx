import NavBar from "../Components/NavBar"
import { Outlet } from "react-router-dom"

function Layout(){
  return(
    <>
    <NavBar/>
    <Outlet/>
    </>
  );
}
export default Layout
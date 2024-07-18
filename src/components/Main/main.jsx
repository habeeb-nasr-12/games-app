import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";



export function Main({loggedinUser,remove }){




    return <>

    <Navbar remove = {remove}  loggedinUser={loggedinUser} />
    <Outlet/>
    
    
    </>
}
import { createContext, useState } from "react";

export const NavBarHeightContext = createContext();

export const NavBarHeightContextProvider = ({children}) =>{
    const [navbarHeight,setNavbarHeight]=useState(null);
    return(
        <NavBarHeightContext.Provider value={{navbarHeight,setNavbarHeight}} >
            {children}
        </NavBarHeightContext.Provider>
    )
}
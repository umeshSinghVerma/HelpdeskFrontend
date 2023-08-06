import { useContext } from "react";
import { NavBarHeightContext } from "../Contexts/NavBarHeightContext";

export default function useNavBarHeightContext() {
    const context = useContext(NavBarHeightContext);
    if(!context){
        throw Error("Navbar Height context can be used only inside its children prop");
    }
    return context;
}

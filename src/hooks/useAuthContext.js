import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";

export default function useAuthContext() {
    const context = useContext(AuthContext)
    if(!context){
        throw Error("useAuthContext must be used only insider the AuthContextProvider");
    }
    return context;
}

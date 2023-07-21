import { useContext } from "react";
import { EditModeContext } from "../Contexts/EditModeContext";

export default function useEditMode() {
    const context = useContext(EditModeContext);
    if(!context){
        throw Error("use Edit Contexts can be called inside its children component")
    }
    return context;
}

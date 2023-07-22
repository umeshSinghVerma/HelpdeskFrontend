import useAuthContext from "./useAuthContext";
import useEditMode from "./useEditMode";

export default function useLogout() {
    const {dispatch} = useAuthContext();
    const {setEditMode}=useEditMode();
    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type:'LOGOUT'})
        setEditMode(false);
    }
    return {logout}
}

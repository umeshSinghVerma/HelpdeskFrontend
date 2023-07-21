import axios from "axios";
import BASE_URL from "../BASE_URL"
import { useState } from "react";
import useAuthContext from "./useAuthContext";
export default function useLogin() {
    const [isLoading,setIsLoading] = useState(null);
    const [error,setError] = useState(null);
    const { dispatch } = useAuthContext();
    
    const login = async(email,password)=>{
        setIsLoading(true);
        setError(null);
        try{
            const res = await axios.post(`${BASE_URL}/user/login`,{email,password});
            if(res.status===200){
                const userData = res.data;
                localStorage.setItem('user',JSON.stringify(userData));
                dispatch({type:'LOGIN',payload:userData});
                document.getElementById('loginCloseButton').click();
            }
        }
        catch(error){
            setError(error.response.data)
        }
        setIsLoading(null);
    }
    return {login,isLoading,error}
  
}

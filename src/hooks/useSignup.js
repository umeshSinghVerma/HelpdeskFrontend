import axios from "axios";
import BASE_URL from "../BASE_URL"
import { useState } from "react";
import useAuthContext from "./useAuthContext";
export default function useSignup() {
    const [isLoading,setIsLoading] = useState(null);
    const [error,setError] = useState(null);
    const { dispatch } = useAuthContext();
    
    const signup = async(email,password)=>{
        setIsLoading(true);
        setError(null);
        try{
            const res = await axios.post(`${BASE_URL}/user/signup`,{email,password});
            if(res.status===200){
                const userData = res.data;
                localStorage.setItem('user',JSON.stringify(userData));
                dispatch({type:'LOGIN',payload:userData});
                document.getElementById('signupCloseButton').click();
            }
        }
        catch(error){
            if(error.response){
                setError(error.response.data)
            }
        }
        setIsLoading(null);
    }
    return {signup,isLoading,error}
  
}

import { useEffect } from "react";
import { useAppSelector } from "../../Store/hooks";
import { useNavigate } from "react-router-dom";

export default function Authdirect() {
    const {token} = useAppSelector((state)=>state.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/login')
           
        }else{
            navigate('/Home')
        }

    },[navigate,token])
  return (
    <></>
  )
}

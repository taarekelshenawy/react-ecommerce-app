import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../Store/hooks';



type childrenProps ={
    children:React.ReactNode;
}
export default function Guard({children}:childrenProps) {
  const {token}=useAppSelector((state)=>state.auth);
 
  const navigate = useNavigate()
      useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  return (
    <>{token && children}</>
  )
}

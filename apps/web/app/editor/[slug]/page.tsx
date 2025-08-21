'use client'
import { useAuth } from "@/auth-context";

export default function (){

  const {isAuthenticated,isLoading} = useAuth();
  
  if(isLoading){}
  if(isAuthenticated) {
    //sync logic
    //if connected to internet push document directly
  }
  return <div>
    
  </div>
  }

  



'use client'
import { Button } from "@/components/ui/button";
import { Github ,Twitter} from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function NavBar(){

  const{data:session,status}=useSession();
    return(
    
      <header className="flex items-center justify-between max-w-7xl mx-auto mt-8">
        <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="50" height="50">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="M110 18 
                 Q150 10 190 18 
                 Q182 35 174 52 
                 Q166 70 164 90 
                 Q160 125 178 165 
                 Q192 195 212 230 
                 Q232 268 212 305 
                 Q195 337 165 358 
                 Q150 369 150 385 
                 Q150 369 135 358 
                 Q105 337 88 305 
                 Q68 268 88 230 
                 Q108 195 122 165 
                 Q140 125 136 90 
                 Q134 70 126 52 
                 Q118 35 110 18 Z"
              fill="none"
              stroke="#a020f0"
              strokeWidth="2.5"
              filter="url(#glow)"
            />

           
            <path
              d="M112 18 
                 Q150 2 188 18
                 Q150 -10 112 18 Z"
              fill="none"
              stroke="#a020f0"
              strokeWidth="2.5"
              filter="url(#glow)"
            />
          </svg>
          <span className="text-3xl font-semibold ">Vessel, Welcome {session?.user.name}</span>
        </div>
        <div className="flex items-center gap-4 ">
          <Button variant="outline" 
          onClick={()=>{
            redirect("auth/signin")
          }}
          className="p-2 hover:bg-gray-100 cursor-pointer" >
            Sign In
          </Button>
          <Button className="p-2 bg-black text-white hover:bg-gray-700"size="sm" variant="secondary" >Try Now</Button>
        </div>  
      </header>
    )
}
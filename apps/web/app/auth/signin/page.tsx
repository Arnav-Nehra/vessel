import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center  dark:bg-gray-950  p-10">
        <div className="text-center space-y-6 ">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
            i know you won’t leave us <br /> like "local storage" 
          </h1>
          <p className="text-lg text-white/80 max-w-md mx-auto">
            Reliable, secure, and always here for you.  
            Unlike local storage, we’ll never disappear.
          </p>
          
        </div>
    </div>
    </div>
  )
}




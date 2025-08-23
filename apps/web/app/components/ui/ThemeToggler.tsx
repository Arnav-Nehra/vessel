'use client'
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggler(){
    const {theme,setTheme} = useTheme();
    
    return <Button
    variant={"default"}
    size={"icon"}
    onClick={()=>{setTheme(theme==='dark' ? 'light': 'dark')}}
    className="fized top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
    >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
        <span className="sr-only">Change theme</span>
    </Button>
}
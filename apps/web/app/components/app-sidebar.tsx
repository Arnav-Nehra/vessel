'use client'
import { Calendar, Home, Inbox, LucideNotebookPen, Notebook, NotebookIcon, NotebookPen, NotebookPenIcon, NotepadText, NotepadTextDashed, NotepadTextDashedIcon, NotepadTextIcon, Search, SearchCheckIcon, SearchIcon, Settings, Settings2, StickyNote, Trash, Trash2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/auth-context"
import { Button } from "./ui/button"
import { title } from "process"
import { redirect, useParams } from "next/navigation"
import { memo, useEffect, useState } from "react"
import { CommandDialogDemo } from "./command"
import { User } from "next-auth"
import Link from "next/link"
import Head from "next/head"
import { Dialog } from "./ui/dialog"
import { Command } from "./ui/command"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { ThemeProvider } from "next-themes"
import ThemeToggler from "./ui/ThemeToggler"
import { cn } from "@/utils"



// Menu items.



const Header = ({ name }: { name?: string | null })=>{
  return (
    <>
   <SidebarHeader className="flex flex-row mt-2 items-center justify-between w-5/6">
      <h1 className="sm:ml-1">{ name ?? "Guest" }</h1>
     
          <Link href={"/editor/123"}>
          <NotebookPen className="size-5"/>
          </Link>
     
          </SidebarHeader>
      </>
    )
}

const MemoizedHeader = memo(Header)


const Footer = ()=>{
  return (
  <SidebarFooter className="mb-8">
    <SidebarMenuButton className="flex flex-row items-center gap-2 hover:bg-gray-100">< Settings className="size-5"></Settings><span>Settings</span></SidebarMenuButton>
    <SidebarMenuButton className="flex flex-row items-center gap-2 hover:bg-gray-100">< Trash2></Trash2><span>Trash</span></SidebarMenuButton>
  </SidebarFooter>)
}



const MemoizedFooter = memo(Footer)


export default function AppSidebar(){
  const {slug} = useParams();
  console.log(slug)
  const{user,isLoading,isAuthenticated} = useAuth();
  const [openSearch,setOpenSearch] = useState(false);
  const[response,setResponse] = useState([{}]);
useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())   
      .then(json=>setResponse(json))
},[])

const handleMenuClick = (action : string)=>{
  if(action == "openSearch"){
    setOpenSearch(true);
  }
}
  return (
  <>
    <Sidebar>
    <MemoizedHeader name={user?.name}></MemoizedHeader>
      
        <SidebarSeparator className="mt-2"/>
         <SidebarMenuButton className="mt-4 ml-2" onClick={()=>setOpenSearch(true)}><Search/><span>Search</span></SidebarMenuButton>
         <h1 className="ml-4 mt-6 mb-4">Notes</h1>

         <SidebarContent>
          
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {response.map((res)=>{
                return <SidebarMenuItem className="mt-2" key={res.id}>
                  <div className={cn(
                    'cursor-pointer  group/thread  flex items-center gap-4 px-2 py-1 rounded-[8px] overflow-hidden w-full h-full hover:bg-gray-200',
                    slug==res.id && 'dark:bg-neutral-700 bg-gray-300'
                  )}
                  onClick={()=>{
                    if(slug === res.id){
                      return;
                    }
                    redirect(`/editor/${res.id}`)
                  }}  
                  >
                    <NotebookIcon size={18}  />
                    {res.title}
                  </div>
                </SidebarMenuItem>
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </SidebarContent>
      <MemoizedFooter/>
    </Sidebar>
    <CommandDialogDemo openState={openSearch} onOpenChange={setOpenSearch} />
    </>
  )
}


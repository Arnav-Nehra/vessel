'use client'
import { Calendar, Home, Inbox, Notebook, NotebookPen, Search, SearchCheckIcon, SearchIcon, Settings, Trash } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
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
import { redirect } from "next/navigation"
import { useState } from "react"

// Menu items.

const items = [
  {
    title: "Search",
    url: "#",
    icon: SearchIcon,
    action:"openSearch"
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    action : "nothing"
  },
  {
    title:'Trash',
    icon: Trash,
    action:"nothing"
  }
]

export function AppSidebar() {
  const{user,isLoading,isAuthenticated} = useAuth();
const [openSearch,setOpenSearch] = useState(false);

const handleMenuClick = (action : string)=>{
  if(action == "openSearch"){
    setOpenSearch(true);
  }
}
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="flex flex-row items-center justify-between w-4/5">
            {user ? user?.name : "Welcome, Guest"} 
            <Button variant ={"link"}  className="w-1">
              <NotebookPen/>
            </Button>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="hover:bg-gray-100" key={item.title}>
                  <SidebarMenuButton asChild onClick={()=>handleMenuClick(item.action)}>
                    <div>
                    <item.icon />
                    <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
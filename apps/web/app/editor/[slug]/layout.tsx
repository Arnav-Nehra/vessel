import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AuthProvider } from "@/auth-context"
import { Providers } from "@/components/LandingPage/providers"
import { CommandDialogDemo } from "@/components/command"
import { ThemeProvider } from "next-themes"
import ThemeToggler from "@/components/ui/ThemeToggler"
import AppSidebar from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <div className="flex-row items-center justify-between p-4 ">
          <SidebarTrigger className="" />
          <ThemeToggler/>
        </div>
        <div className="flex-1 p-4">
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </div>
      </main>
    </SidebarProvider>
  )
}
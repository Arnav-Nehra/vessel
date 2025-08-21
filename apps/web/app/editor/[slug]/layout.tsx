import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/auth-context"
import { Providers } from "@/components/LandingPage/providers"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Providers> <AuthProvider>{children}</AuthProvider></Providers>
       
      </main>
    </SidebarProvider>
  )
}
'use client'
import * as React from "react"
import { useRouter, usePathname } from "next/navigation" // ใช้ usePathname แทน useRouter
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
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Manage",
      url: "#",
      items: [
        {
          title: "Products Manage",
          url: "/Admin/ManageProducts", 
        },
        {
          title: "News Manage",
          url: "/Admin/ManageNews", 
        },
        {
          title: "Login",
          url: "/Admin/Login", 
        },
      ],
    },
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter() // ใช้ useRouter
  const pathname = usePathname() // ใช้ usePathname เพื่อดึง URL ปัจจุบัน

  // ฟังก์ชันสำหรับจัดการการคลิกเพื่อทำการ router.push
  const handleMenuClick = (url: string) => {
    router.push(url) // ใช้ router.push เพื่อทำการเปลี่ยนเส้นทาง
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex justify-center items-center text-4xl font-bold">Dashboard</div>
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="cursor-default">
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url} // ใช้ pathname จาก usePathname
                      onClick={() => handleMenuClick(item.url)} // เรียกใช้ handleMenuClick เมื่อคลิก
                    >
                      <a>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

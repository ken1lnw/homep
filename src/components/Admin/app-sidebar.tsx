"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation"; // ใช้ usePathname แทน useRouter
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useFlowManager } from "@/providers/flow-manager-provider";

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
          url: "/Admin/dashboard/ManageProducts",
        },
        {
          title: "News Manage",
          url: "/Admin/dashboard/ManageNews",
        },
    
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter(); // ใช้ useRouter
  const pathname = usePathname(); // ใช้ usePathname เพื่อดึง URL ปัจจุบัน

  // ฟังก์ชันสำหรับจัดการการคลิกเพื่อทำการ router.push
  const handleMenuClick = (url: string) => {
    router.push(url); // ใช้ router.push เพื่อทำการเปลี่ยนเส้นทาง
  };
  const { logout, isLoading } = useFlowManager();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex justify-center items-center text-4xl font-bold">
          <img src="/TH-TYC_logoWhitesmallnobg.png" alt="" />
        </div>
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
                      className={`${
                        pathname === item.url
                          ? "!bg-blue-500 !text-white"
                          : "hover:bg-blue-100"
                      } rounded-md px-2 py-1`}
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
      <SidebarFooter className="">
        <SidebarMenuButton className="hover:bg-blue-100" onClick={logout}>
          <a> Logout </a>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useFlowManager } from "@/providers/flow-manager-provider";
import { ChevronRight } from "lucide-react";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Data Management",
      url: "#",
      items: [
        {
          title: "Products Manage",
          url: "/Admin/dashboard/ManageProducts",
        },

        {
          title: "News",
          url: "#",
          items: [
            {
              title: "Article Manage",
              url: "/Admin/dashboard/ManageNews",
            },
            {
              title: "New Product Manage",
              url: "/Admin/dashboard/ManageNewsProducts",
            },
          ],
        },


        {
          title: "Inquiry",
          url: "#",
          items: [
            {
              title: "General Inquiry",
              url: "/Admin/dashboard/ManageGeneralInquiry",
            },
            {
              title: "Product Inquiry",
              url: "/Admin/dashboard/ManageProductInquiry",
            },
          ],
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
  const { logout } = useFlowManager();

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
                {item.items.map((menuItem) => (
                  <SidebarMenuItem key={menuItem.title}>
                    {/* Check if the menu item has sub-items */}
                    {menuItem.items ? (
                      <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuButton
                          asChild
                          isActive={
                            pathname === menuItem.url || // Active if the parent menu item matches
                            menuItem.items.some(
                              (subItem) => pathname === subItem.url
                            ) // Active if any sub-item matches
                          }
                          className={`${
                            pathname === menuItem.url ||
                            menuItem.items.some(
                              (subItem) => pathname === subItem.url
                            ) // Apply active class if any sub-item is active
                              ? "!bg-blue-500 !text-white"
                              : "hover:bg-blue-100"
                          } rounded-md px-2 py-1`}
                        >
                          <CollapsibleTrigger>
                            {menuItem.title}
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </CollapsibleTrigger>
                        </SidebarMenuButton>
                        <CollapsibleContent>
                          <SidebarMenu>
                            <SidebarMenuSub>
                              {menuItem.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === subItem.url}
                                    onClick={() => handleMenuClick(subItem.url)}
                                    className={`${
                                      pathname === subItem.url
                                        ? "!bg-blue-500 !text-white"
                                        : "hover:bg-blue-100"
                                    } rounded-md px-2 py-1`}
                                  >
                                    <a>{subItem.title}</a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </SidebarMenu>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === menuItem.url}
                        onClick={() => handleMenuClick(menuItem.url)}
                        className={`${
                          pathname === menuItem.url
                            ? "!bg-blue-500 !text-white"
                            : "hover:bg-blue-100"
                        } rounded-md px-2 py-1`}
                      >
                        <a>{menuItem.title}</a>
                      </SidebarMenuButton>
                    )}
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

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Admin/app-sidebar";
import { Noto_Sans_Thai_Looped  } from "next/font/google";

// import "@/style/sidebar-admin.css"

const NotoFont = Noto_Sans_Thai_Looped({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});




export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={NotoFont.className}>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-auto">
        <main>
          <SidebarTrigger />
          {/* <div className="bg-blue-500 w-screen flex justify-center p-4"> */}
          <div className="flex-1 flex flex-col mx-auto p-6 w-full">
          {children}
          </div>
          {/* </div> */}
        </main>
        </SidebarInset>
    </SidebarProvider>
    </section>
  );
}

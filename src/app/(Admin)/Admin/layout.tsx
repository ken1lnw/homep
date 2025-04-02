import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Admin/app-sidebar";
import { Merriweather_Sans , Montserrat, Noto_Sans_Thai_Looped, Slabo_13px  } from "next/font/google";

// import "@/style/sidebar-admin.css"

const NotoFont = Noto_Sans_Thai_Looped({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const TYCFont = Montserrat({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "500",
});



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={NotoFont.className}>
    <SidebarProvider>
      <body>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </body>
    </SidebarProvider>
    </section>
  );
}

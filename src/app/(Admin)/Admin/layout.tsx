import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Admin/app-sidebar";
import { Merriweather_Sans , Slabo_13px  } from "next/font/google";
// import "@/style/sidebar-admin.css"
const MerriweatherSans = Merriweather_Sans({
  // variable: "--font-salabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const SlaboSans = Slabo_13px ({
  variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <body className={SlaboSans.className}>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </body>
    </SidebarProvider>
  );
}

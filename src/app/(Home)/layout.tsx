import { ReactNode } from "react";
import Navbar2 from "./navbar2";
import Footer from "./footer";
import '@ant-design/v5-patch-for-react-19';
const Layout = ({children} : {children:ReactNode}) => {
    return <>
     
                  <div className="flex flex-col min-h-screen">
      <Navbar2 />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
    </>
}
 
export default Layout;
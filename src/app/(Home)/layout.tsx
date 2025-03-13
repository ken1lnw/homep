import { ReactNode } from "react";
import Navbar2 from "./navbar2";
import Footer from "./footer";

const Layout = ({children} : {children:ReactNode}) => {
    return <>
     
                  <Navbar2 />
                  {children}
                  <Footer />
    </>
}
 
export default Layout;
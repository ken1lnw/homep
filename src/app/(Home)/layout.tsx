import { ReactNode } from "react";
import Navbar2 from "./navbar2";
import Footer from "./footer";
import '@ant-design/v5-patch-for-react-19';
const Layout = ({children} : {children:ReactNode}) => {
    return <>
     
                  <Navbar2 />
                  {children}
                  <Footer />
    </>
}
 
export default Layout;
'use client'


import dynamic from "next/dynamic";

const NavbarDynamic =  dynamic(() => import("@/components/NavbarDynamic"), { ssr: false });

const Navbar2 = () => {
  return <NavbarDynamic/>
}
 
export default Navbar2;
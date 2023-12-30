import { useRouter } from "next/router";
import Navbar from "../navbar";
type AppShellProps={
    children:React.ReactNode;
}
const AppShell=(props:AppShellProps)=>{
    const {children} = props;
    const disableNavbar=["/auth/login","/auth/register","/404"];
    const {pathname} =useRouter();
    return(
        <div>
            {!disableNavbar.includes(pathname) && <Navbar/>}
            {children}
        </div>
    )
}
export default AppShell;
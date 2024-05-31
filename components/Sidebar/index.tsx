import { SidebarNavs } from "./constants";
import SidebarNav from "../SidebarNav";

export default function Sidebar() {
   return (
     <nav className="min-w-40 h-screen px-2 py-4 border-solid border-r-2">
       {SidebarNavs.map((el, _i) => (
         <SidebarNav key={_i} value={el.value} id={el.id} href={el.href} icon={el.icon}/>
       ))}
     </nav>
   );
 }
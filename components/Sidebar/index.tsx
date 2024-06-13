import { useUserRole } from '@/hooks/useUserRole';
import { SidebarNavs } from "./constants";
import SidebarNav from "../SidebarNav";
import { logout } from "@/lib/auth";

export default function Sidebar() {
  const role = useUserRole();

  const filteredNavs = SidebarNavs.filter(nav => {
    if (nav.value === "Superadmin" && role !== "SUPERADMIN") {
      return false;
    }
    return true;
  });

  return (
    <nav className="min-w-40 h-screen px-2 py-4 border-solid border-r-2 fixed">
      {filteredNavs.map((el, _i) => (
        <div key={_i} onClick={el.value === "Logout" ? logout : undefined}>
          <SidebarNav value={el.value} id={el.id} href={el.href} icon={el.icon} />
        </div>
      ))}
    </nav>
  );
}

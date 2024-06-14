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
    <nav className="min-w-40 h-screen px-2 py-4 fixed shadow-md flex flex-col justify-between bg-slate-900">
      <div>
        {filteredNavs.filter(nav => nav.value !== "Logout").map((el, _i) => (
          <div key={_i}>
            <SidebarNav value={el.value} id={el.id} href={el.href} icon={el.icon} />
          </div>
        ))}
      </div>
      <div className="mt-auto" onClick={logout}>
        <SidebarNav value="Logout" id={7} href="#" icon="logout" />
      </div>
    </nav>
  );
}

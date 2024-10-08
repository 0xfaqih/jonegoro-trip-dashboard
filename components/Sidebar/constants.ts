import { SidebarNav } from "@/types/SidebarNav";

export const SidebarNavs: SidebarNav[] = [
  {
    id: 1,
    value: "Beranda",
    href: "/",
    icon: "home"
  },
  {
    id: 2,
    value: "Wisata",
    href: "/tour",
    icon: "tour"
  },
  {
    id: 3,
    value: "Informasi",
    href: "/info",
    icon: "info"
  },
  {
    id: 4,
    value: "Oleh - Oleh",
    href: "/souvenir",
    icon: "sovenir"
  },
  {
    id: 5,
    value: "Akomodasi",
    href: "/accommodation",
    icon: "accommodation"
  },
  {
    id: 6,
    value: "Superadmin",
    href: "/superadmin",
    icon: "user"
  },
  {
    id: 7,
    value: "Logout",
    href: "#",
    icon: "logout"
  },
];
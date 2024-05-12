import { Icons } from "@/components/icons"

export type SidebarNav = {
   id: number,
   value: string,
   href: string,
   icon?: keyof typeof Icons;
}
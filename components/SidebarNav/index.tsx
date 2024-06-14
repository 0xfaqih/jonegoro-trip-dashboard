"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { Icons } from "@/components/icons";

interface SidebarNavProps {
  value: string;
  href: string;
  id: number;
  icon?: keyof typeof Icons;
}

const SidebarNav: FC<SidebarNavProps> = ({ value, href, icon }) => {
  const route: string = usePathname();
  const isActive = route === href;

  return (
    <div className={`mb-2 relative ${isActive ? 'bg-white text-primary rounded-md' : 'text-white border-b'}`}>
      <Link href={href} className={`p-2 font-medium flex items-center ${isActive ? 'text-highlight' : ''}`}>
        {icon && React.createElement(Icons[icon], { size: 16, className: "mr-2" })}
        {value}
      </Link>
      <div
        className=" absolute w-full h-1 top-[62px]"
        style={isActive ? { display: "flex" } : { display: "none" }}
      />
    </div>
  );
};

export default SidebarNav;

"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";

interface SidebarNavProps {
  value: string;
  href: string;
  id: number;
}

const SidebarNav: FC<SidebarNavProps> = ({ value, href }) => {
  const route: string = usePathname();
  return (
    <div className="mb-2">
      <Link href={href} className="text-black font-medium">
        {value}
      </Link>
      <div
        className="bg-primaryColor absolute w-full h-1 top-[62px]"
        style={href === route ? { display: "flex" } : { display: "none" }}
      />
    </div>
  );
};

export default SidebarNav;
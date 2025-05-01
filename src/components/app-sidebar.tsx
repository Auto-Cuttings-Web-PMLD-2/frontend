"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Upload, History } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarHeader,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";

import { cn } from "@/lib/utils";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Upload Image",
        url: "/upload-image",
        icon: Upload,
    },
    {
        title: "History",
        url: "/history",
        icon: History,
    },
];

export function AppSidebar() {
    const pathName = usePathname();

    return (
        <Sidebar className="bg-black text-stone-200">
            <SidebarHeader className="h-20 flex items-center flex-row bg-black">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a
                                href="/dashboard"
                                className="h-full hover:bg-transparent hover:text-stone-200 active:bg-transparent active:text-stone-200 "
                            >
                                <Image
                                    src="/stone_logo.svg"
                                    alt="Vercel Logo"
                                    width={80}
                                    height={80}
                                />
                                <span className="font-bold text-base">
                                    Stone Detector
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <div className="bg-black">
                <hr className="h-1 bg-stone-100 mx-4"></hr>
            </div>
            <SidebarContent className="p-4 bg-black">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathName === item.url}
                            >
                                <Link
                                    href={item.url}
                                    className={cn(
                                        "p-4 flex items-center justify-start", // default
                                        "group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center" // saat collapsed
                                    )}
                                >
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

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
        <Sidebar className="bg-[var(--biru-dua)] text-stone-200">
            <SidebarHeader className="h-20 flex items-center flex-row bg-[var(--biru-dua)]">
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
            <div className="bg-[var(--biru-dua)]">
                <hr className="h-[2px] bg-stone-100 mx-4"></hr>
            </div>
            <SidebarContent className="pt-4 bg-[var(--biru-dua)]">
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive = pathName === item.url;

                        return (
                            <SidebarMenuItem
                                key={item.title}
                                className="group/item"
                            >
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    className={cn(
                                        "rounded-none transition-colors",
                                        isActive &&
                                            "!bg-[var(--biru-satu)] !text-[var(--biru-dua)]",
                                        "group-hover/item:bg-[var(--biru-satu)] group-hover/item:text-[var(--biru-dua)]"
                                    )}
                                >
                                    <Link
                                        href={item.url}
                                        className="py-4 px-8 flex items-center justify-start"
                                    >
                                        <item.icon
                                            className={cn(
                                                "mr-2 transition-colors",
                                                isActive
                                                    ? "text-[var(--biru-dua)]"
                                                    : "text-white group-hover/item:text-[var(--biru-dua)]"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "transition-colors",
                                                isActive
                                                    ? "text-[var(--biru-dua)]"
                                                    : "text-white group-hover/item:text-[var(--biru-dua)]"
                                            )}
                                        >
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

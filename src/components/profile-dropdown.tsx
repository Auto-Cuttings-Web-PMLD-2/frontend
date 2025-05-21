"use client";

import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, ChevronDown } from "lucide-react";
import { signOutUser } from "@/lib/auth";

export function ProfileDropdown() {
    const [username, setUsername] = useState<string>("...");

    const handleLogout = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/me", {
                    method: "GET",
                    credentials: "include", // ← penting agar cookie dikirim
                });

                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
                } else {
                    console.error(
                        "Gagal mengambil user info:",
                        await res.text()
                    );
                }
            } catch (err) {
                console.error("Error fetch user:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="flex items-center text-[var(--biru-tiga)]">
            <CircleUserRound className="mr-3" />
            <span className="mr-3">{username}</span>
            <DropdownMenu>
                <DropdownMenuTrigger className="mr-12">
                    <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-[var(--biru-tiga)]">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

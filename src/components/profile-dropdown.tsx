import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleUserRound, ChevronDown } from "lucide-react";

export function ProfileDropdown() {
    return (
        <div className="flex items-center text-stone-700">
            <CircleUserRound className="mr-3" />
            <span className="mr-3">Alya 25</span>
            <DropdownMenu>
                <DropdownMenuTrigger className="mr-12">
                    <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

import { LayoutDashboard } from "lucide-react";
import { Poppins } from "next/font/google";
import { PieChartDonut } from "@/components/chart-pie-donut";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Dashboard() {
    return (
        <div className={`bg-[#F4F4F4] ${poppins.className} p-10`}>
            <div className="flex items-center text-5xl font-semibold text-black opacity-60">
                <LayoutDashboard className="h-16 w-16" />
                <span className="ml-4">Dashboard</span>
            </div>
            <div className="bg-white">
                <PieChartDonut />
                <div className="border rounded border-blue-400">
                    <p>Percentage comparison of stone types</p>
                </div>
            </div>
        </div>
    );
}

import { LayoutDashboard } from "lucide-react";
import { PieChartDonut } from "@/components/chart-pie-donut";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div className="bg-[#F4F4F4] p-10">
            <div className="flex items-center text-5xl font-semibold text-black opacity-60">
                <LayoutDashboard className="h-16 w-16" />
                <span className="ml-4">Dashboard</span>
            </div>
            <div className="bg-white mt-10 px-20 rounded-xl shadow-xl">
                <PieChartDonut />
                <div className="border-3 border-dashed border-[#4D96FF] rounded-2xl p-10">
                    <p className="text-2xl font-semibold text-[#555555]">
                        Percentage comparison of stone types
                    </p>
                    <div className="flex justify-around items-center mt-10">
                        <div>
                            <p className="w-full text-center text-6xl font-semibold text-[#4D96FF]">
                                66%
                            </p>
                            <p className="text-5xl font-normal text-[#555555]">
                                Siltstone
                            </p>
                        </div>
                        <div>
                            <p className="w-full text-center text-6xl font-semibold text-[#4D96FF]">
                                34%
                            </p>
                            <p className="text-5xl font-normal text-[#555555]">
                                Sandstone
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around items-center mt-20">
                    <div>
                        <div className="w-4 h-4 rounded-full bg-[#A0C878] inline-block"></div>
                        <p className="inline-block text-2xl font-semibold text-[#555555]">
                            Total of All Incoming Data
                        </p>
                        <p className="text-center text-2xl text-[#555555] mt-5">
                            65 Data
                        </p>
                    </div>
                    <div>
                        <div className="w-4 h-4 rounded-full bg-[#A0C878] inline-block"></div>
                        <p className="inline-block text-2xl font-semibold text-[#555555]">
                            Total Incoming Data Today
                        </p>
                        <p className="text-center text-2xl text-[#555555] mt-5">
                            5 Data
                        </p>
                    </div>
                </div>
                <p className="mt-20 text-[40px] font-medium text-[#555555]">
                    Recent Data Result :
                </p>
                <Image
                    src={"/segmentation_result.png"}
                    alt="Segmentation Result"
                    width={2000}
                    height={2000}
                    className="w-full h-auto object-cover mt-5 pb-20"
                />
            </div>
        </div>
    );
}

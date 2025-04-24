"use client";

import { Pie, PieChart } from "recharts";

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
    { stoneType: "Siltstone", percentage: 275, fill: "#0069FF" },
    { stoneType: "Sandstone", percentage: 200, fill: "#4D96FF" },
];

const chartConfig = {} satisfies ChartConfig; // Gak guna tapi biarkan saja

export function PieChartDonut() {
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[600px]"
        >
            <PieChart className="">
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="percentage"
                    nameKey="stoneType"
                    innerRadius={130}
                    outerRadius={230} // Radius luar → ukuran keseluruhan pie
                    startAngle={90} // Memulai dari atas (default 0 = kanan)
                    endAngle={-270} // Arah searah jarum jam (-360 untuk full circle)
                    cx="50%" // Posisi horizontal (default tengah)
                    cy="50%" // Posisi vertikal (default tengah)
                />
            </PieChart>
        </ChartContainer>
    );
}

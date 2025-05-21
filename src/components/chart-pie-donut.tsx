"use client";

import { Pie, PieChart } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Tambahkan props
interface PieChartDonutProps {
    sandTotal: number;
    siltTotal: number;
}

const chartConfig = {} satisfies ChartConfig;

export function PieChartDonut({ sandTotal, siltTotal }: PieChartDonutProps) {
    const chartData = [
        { stoneType: "Siltstone", percentage: siltTotal, fill: "#0069FF" },
        { stoneType: "Sandstone", percentage: sandTotal, fill: "#4D96FF" },
    ];

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[600px]"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="percentage"
                    nameKey="stoneType"
                    innerRadius={130}
                    outerRadius={230}
                    startAngle={90}
                    endAngle={-270}
                    cx="50%"
                    cy="50%"
                />
            </PieChart>
        </ChartContainer>
    );
}

"use client";

import { LayoutDashboard } from "lucide-react";
import { PieChartDonut } from "@/components/chart-pie-donut";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  postDate: string;
  sandStoneCount: number;
  sandStoneCoverage: number;
  segmentedImageURL: string;
  siltStoneCount: number;
  siltStoneCoverage: number;
  user_id: number;
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<Project[]>([]);
  const [sandTotal, setSandTotal] = useState(0);
  const [siltTotal, setSiltTotal] = useState(0);
  const [sandPercentage, setSandPercentage] = useState(0);
  const [siltPercentage, setSiltPercentage] = useState(0);
  const [lastImageUrl, setLastImageUrl] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/projects", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch project data");
        }

        const data: Project[] = await res.json();
        setDashboard(data);

        // Hitung total count
        const totalSand = data.reduce(
          (acc, item) => acc + item.sandStoneCount,
          0
        );
        const totalSilt = data.reduce(
          (acc, item) => acc + item.siltStoneCount,
          0
        );
        const totalAll = totalSand + totalSilt;

        setSandTotal(totalSand);
        setSiltTotal(totalSilt);

        // Hitung persentase
        setSandPercentage(
          totalAll > 0 ? Math.round((totalSand / totalAll) * 100) : 0
        );
        setSiltPercentage(
          totalAll > 0 ? Math.round((totalSilt / totalAll) * 100) : 0
        );

        // Ambil segmented image dari proyek terakhir (berdasarkan postDate terbaru dan id terbesar)
        const sortedData = [...data].sort((a, b) => {
          const dateA = new Date(a.postDate).getTime();
          const dateB = new Date(b.postDate).getTime();

          if (dateA === dateB) {
            return b.id - a.id; // jika tanggal sama, ambil id terbesar
          }

          return dateB - dateA; // urutkan berdasarkan tanggal terbaru
        });

        const lastProject = sortedData[0]; // ambil proyek paling atas setelah sorting
        // console.log(lastProject?.segmentedImageURL);
        setLastImageUrl(lastProject?.segmentedImageURL || "");
      } catch (err) {
        console.error("Error fetching project data:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-[#F4F4F4] p-10">
      <div className="flex items-center text-5xl font-bold text-[var(--biru-dua)]">
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
                {sandPercentage} %
              </p>
              <p className="text-5xl font-normal text-[#555555]">Sandstone</p>
            </div>
            <div>
              <p className="w-full text-center text-6xl font-semibold text-[#4D96FF]">
                {siltPercentage} %
              </p>
              <p className="text-5xl font-normal text-[#555555]">Siltstone</p>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center mt-20">
          <div>
            <div className="w-4 h-4 rounded-full bg-[var(--biru-satu)] inline-block"></div>
            <p className="ml-5 inline-block text-2xl font-semibold text-[#555555]">
              Total of All Incoming Data
            </p>
            <p className="text-center text-2xl text-[#555555] mt-5">
              {sandTotal}
            </p>
          </div>
          <div>
            <div className="w-4 h-4 rounded-full bg-[var(--biru-tiga)] inline-block"></div>
            <p className="ml-5 inline-block text-2xl font-semibold text-[#555555]">
              Total Incoming Data Today
            </p>
            <p className="text-center text-2xl text-[#555555] mt-5">
              {siltTotal}
            </p>
          </div>
        </div>
        <p className="mt-20 text-[40px] font-medium text-[#555555]">
          Recent Data Result :
        </p>
        {lastImageUrl ? (
          <Image
            src={lastImageUrl}
            alt="Segmentation Result"
            width={2000}
            height={2000}
            className="w-full h-auto object-cover mt-5 pb-20"
          />)
          : (
          <p className="text-center text-gray-500 mt-5 pb-10">
            No image available.
          </p>
        )}
      </div>
    </div>
  );
}

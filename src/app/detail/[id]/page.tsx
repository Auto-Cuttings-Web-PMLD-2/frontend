"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Cookies from "js-cookie";
import { use } from "react";

interface Project {
  id: number;
  name: string;
  postDate: string | Date;
  sandStoneCount: number;
  sandStoneCoverage: number;
  segmentedImageURL: string;
  siltStoneCount: number;
  siltStoneCoverage: number;
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (date: Date | string): string => {
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get("access_token");
        const response = await fetch(`http://localhost:5000/projects/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data project");
        }

        const data = await response.json();
        setProject(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    router.push("/history");
  };

  if (isLoading) {
    return <div className="p-10 text-xl">Memuat data...</div>;
  }

  if (error !== "") {
    return <div className="p-10 text-red-500 font-bold">{error}</div>;
  }

  if (!project) return null;

  return (
    <div className="bg-[#F4F4F4] p-10">
      <div className="flex items-center text-5xl font-bold text-[var(--biru-dua)]">
        <VisibilityIcon sx={{ fontSize: 64 }} />
        <span className="ml-4">Lihat Detail Project</span>
      </div>

      <div className="bg-white rounded-lg shadow-xl mt-10 p-8">
        <p className="text-5xl font-semibold text-[var(--biru-dua)] text-center">
          {project.name}
        </p>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Post date : {formatDate(project.postDate)}
        </p>

        <Image
          src={project.segmentedImageURL}
          alt="Segmentation Result"
          width={2000}
          height={2000}
          className="mt-10 w-full h-fit object-contain"
        />

        <p className="mt-8 text-2xl font-medium">Tabel Hasil</p>
        <table className="table-auto border-collapse border border-gray-400 shadow-lg mt-3 w-full text-[#1D2433]">
          <thead className="text-sm font-bold bg-[#F1F3F9]">
            <tr>
              <th className="border border-gray-300 py-2">Class Name</th>
              <th className="border border-gray-300 py-2">Coverage</th>
              <th className="border border-gray-300 py-2">Count</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal">
            <tr>
              <td className="border border-gray-300 py-2 pl-2">Siltstone</td>
              <td className="border border-gray-300 py-2 pl-2">
                {project.siltStoneCoverage}
              </td>
              <td className="border border-gray-300 py-2 pl-2">
                {project.siltStoneCount}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 py-2 pl-2">Sandstone</td>
              <td className="border border-gray-300 py-2 pl-2">
                {project.sandStoneCoverage}
              </td>
              <td className="border border-gray-300 py-2 pl-2">
                {project.sandStoneCount}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="w-full flex justify-end">
          <button
            onClick={handleBack}
            className="flex justify-center items-center w-56 mt-8 mr-5 py-3 pr-7 rounded-md text-2xl text-white font-medium bg-[var(--biru-dua)] hover:bg-gray-500 cursor-pointer"
          >
            <ChevronLeft size={28} />
            <span className="ml-2">Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

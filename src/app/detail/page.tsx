"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ResultImage() {
    const { push } = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSignIn = async (e: any) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            e.target.reset();
            setIsLoading(false);
            push("/upload-image");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-[#F4F4F4] p-10">
            <div className="flex items-center text-5xl font-bold text-[var(--biru-dua)]">
                <VisibilityIcon
                    sx={{ fontSize: 64 }}
                    className="w-16 h-16 object-contain"
                />
                <span className="ml-4">View Detail Project</span>
            </div>
            {error !== "" && (
                <div className="text-red-500 font-bold mb-3">{error}</div>
            )}
            <div className="bg-white rounded-lg shadow-xl mt-10 p-8">
                <p className="text-5xl font-semibold text-[var(--biru-dua)] text-center">
                    (Nama Proyek)
                </p>
                <Image
                    src={"/segmentation_result.png"}
                    alt="Segmentation Result"
                    width={2000}
                    height={2000}
                    className="mt-10 w-full h-fit object-contain"
                />
                <p className="mt-8 text-2xl font-medium">Result Table</p>
                <table className="table-auto border-collapse border border-gray-400 shadow-lg mt-3 w-full text-[#1D2433]">
                    <thead className="text-sm font-bold bg-[#F1F3F9]">
                        <tr>
                            <th className="border border-gray-300 py-2">
                                Class Name
                            </th>
                            <th className="border border-gray-300 py-2">
                                Coverage
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-normal">
                        <tr>
                            <td className="border border-gray-300 py-2 pl-2">
                                Siltstone
                            </td>
                            <td className="border border-gray-300 py-2 pl-2">
                                0.45006429036458334
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 py-2 pl-2">
                                Sandstone
                            </td>
                            <td className="border border-gray-300 py-2 pl-2">
                                0.3017277018229167
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    disabled={isLoading}
                    type="submit"
                    className="flex justify-center items-center w-56 mt-8 mr-5 py-3 pr-7 rounded-md text-2xl text-white font-medium bg-[var(--merah-satu)] hover:bg-red-800 cursor-pointer"
                >
                    <ChevronLeft size={28} />
                    <span className="ml-2">
                        {isLoading ? "Loading..." : "Back"}
                    </span>
                </button>
            </div>
        </div>
    );
}

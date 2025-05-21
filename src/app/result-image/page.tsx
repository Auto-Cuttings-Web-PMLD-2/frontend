"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie";

export default function ResultImage() {
    const { push } = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [resultData, setResultData] = useState<any>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("resultData");
        if (storedData) {
            setResultData(JSON.parse(storedData));
        } else {
            setError("No result data found. Please upload an image first.");
        }
    }, []);

    console.log(resultData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const token = Cookies.get("access_token");

            if (!token) {
                throw new Error("Access token not found");
            }

            const response = await fetch("http://localhost:5000/projects", {
                method: "POST",
                credentials: "include", // ← penting agar cookie dikirim,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: projectName,
                    sandStoneCount: resultData?.sandStoneCount,
                    sandStoneCoverage: resultData?.sandStoneCoverage,
                    segmentedImageURL: resultData?.segmentedImageURL,
                    siltStoneCount: resultData?.siltStoneCount,
                    siltStoneCoverage: resultData?.siltStoneCoverage,
                }),
            });

            if (!response.ok) {
                const resErr = await response.json();
                throw new Error(resErr.message || "Failed to save project");
            }

            // Setelah berhasil simpan, arahkan ke halaman lain
            push("/upload-image"); // Atau sesuaikan dengan halaman tujuan Anda
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        push("/upload-image");
    };

    return (
        <div className="bg-[#F4F4F4] p-10">
            <div className="flex items-center text-5xl font-bold text-[var(--biru-dua)]">
                <Image
                    src="/result_logo.svg"
                    alt="Result Logo"
                    width={700}
                    height={700}
                    className="w-16 h-16 object-contain"
                />
                <span className="ml-4">Result Image</span>
            </div>

            {error && (
                <div className="text-red-500 font-bold mb-3 mt-10">{error}</div>
            )}

            {resultData && (
                <div className="bg-white rounded-lg shadow-xl mt-10 p-8">
                    <Image
                        src={resultData.segmentedImageURL}
                        alt="Segmentation Result"
                        width={2000}
                        height={2000}
                        className="w-full h-fit object-contain"
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
                                <th className="border border-gray-300 py-2">
                                    Count
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-normal">
                            <tr>
                                <td className="border border-gray-300 py-2 pl-2">
                                    Siltstone
                                </td>
                                <td className="border border-gray-300 py-2 pl-2">
                                    {resultData.siltStoneCoverage}
                                </td>
                                <td className="border border-gray-300 py-2 pl-2">
                                    {resultData.siltStoneCount}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 py-2 pl-2">
                                    Sandstone
                                </td>
                                <td className="border border-gray-300 py-2 pl-2">
                                    {resultData.sandStoneCoverage}
                                </td>
                                <td className="border border-gray-300 py-2 pl-2">
                                    {resultData.sandStoneCount}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="mt-8 text-2xl font-medium">Project Name</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="mt-3 py-2 px-2 border-b border-gray-400 text-xl text-[#1D2433] w-full focus:outline-none"
                            placeholder="Add project name"
                            required
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex justify-center items-center w-56 mt-8 mr-5 py-3 pr-7 rounded-md text-2xl text-white font-medium bg-[var(--merah-satu)] hover:bg-red-800 cursor-pointer"
                            >
                                <X size={28} />
                                <span className="ml-2">Cancel</span>
                            </button>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="flex justify-center items-center w-56 mt-8 py-3 pr-7 rounded-md text-2xl text-white font-medium bg-green-500 hover:bg-green-800 cursor-pointer"
                            >
                                <Save size={28} />
                                <span className="ml-2">
                                    {isLoading ? "Saving..." : "Save"}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

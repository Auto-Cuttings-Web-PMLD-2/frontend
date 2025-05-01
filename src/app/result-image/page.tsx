"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, Save } from "lucide-react";
import Image from "next/image";

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
            <div className="flex items-center text-5xl font-semibold">
                <Image
                    src="/result_logo.svg"
                    alt="Result Logo"
                    width={700}
                    height={700}
                    className="w-16 h-16 object-contain"
                />
                <span className="ml-4 opacity-70">Result Image</span>
            </div>
            {error !== "" && (
                <div className="text-red-500 font-bold mb-3">{error}</div>
            )}
            <div className="bg-white rounded-lg shadow-xl mt-10 p-8">
                <Image
                    src={"/segmentation_result.png"}
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
                <p className="mt-8 text-2xl font-medium">Project Name</p>
                <form onSubmit={(e) => handleSignIn(e)}>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-3 py-2 px-2 border-b border-gray-400 text-xl text-[#1D2433] w-full focus:outline-none"
                        placeholder="Add project name"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="flex justify-center items-center w-56 mt-8 mr-5 py-3 pr-7 rounded-md text-2xl text-white font-medium bg-[#EB5353] hover:bg-red-800 cursor-pointer"
                        >
                            <X size={28} />
                            <span className="ml-2">
                                {isLoading ? "Loading..." : "Cancel"}
                            </span>
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="flex justify-center items-center w-56 mt-8 py-3 pr-7 rounded-md text-2xl text-white font-medium bg-green-500 hover:bg-green-800 cursor-pointer"
                        >
                            <Save size={28} />
                            <span className="ml-2">
                                {isLoading ? "Loading..." : "Save"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

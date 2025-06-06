"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, X, ScanSearch } from "lucide-react";
import Image from "next/image";

export default function UploadImage() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { push } = useRouter();

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }, []);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleClickUploadArea = () => {
        fileInputRef.current?.click();
    };

    const handleCancel = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSave = async () => {
        if (!image) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:5000/analyze", {
                method: "POST",
                credentials: "include", // ← penting agar cookie dikirim,
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Gagal mengupload gambar");
            }

            const result = await response.json();

            // Simpan ke localStorage untuk digunakan di halaman result-image
            localStorage.setItem("resultData", JSON.stringify(result));

            push("/result-image");
        } catch (error) {
            alert("Terjadi kesalahan saat mengupload gambar.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#F4F4F4] p-10">
            <div className="flex items-center text-5xl font-bold text-[var(--biru-dua)]">
                <Upload className="h-16 w-16" />
                <span className="ml-4">Upload Image</span>
            </div>
            <div className="bg-white rounded-lg shadow-xl mt-10 p-8">
                <div
                    className="flex flex-col items-center justify-center bg-[#D9D9D9] rounded-lg w-full h-[471px] cursor-pointer overflow-hidden"
                    onClick={handleClickUploadArea}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            width={1050}
                            height={500}
                        />
                    ) : (
                        <>
                            <div className="relative">
                                <Image
                                    className="h-24 w-24 object-cover"
                                    src="/dragdrop_logo.svg"
                                    alt="Drag and Drop Logo"
                                    width={90}
                                    height={90}
                                />
                                <Image
                                    className="absolute top-5 left-1/2 -translate-x-1/2 h-9 w-9 object-cover"
                                    src="/dragdrop_logo2.svg"
                                    alt="Drag and Drop Logo 2"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="text-5xl text-[#555555] font-normal mt-4">
                                Drag and drop
                            </p>
                        </>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                />

                <div className="flex justify-end mt-8 space-x-4">
                    {!preview ? (
                        <label className="basis-1/4 flex items-center justify-center bg-[#4D96FF] hover:bg-blue-800 text-white text-2xl font-medium pl-6 pr-12 py-3 rounded-lg cursor-pointer">
                            <Plus strokeWidth={3} />
                            <span className="ml-2">Add Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <>
                            <button
                                onClick={handleCancel}
                                className="basis-1/4 flex items-center justify-center bg-[#EB5353] hover:bg-red-800 cursor-pointer text-white text-2xl font-medium pl-6 pr-12 py-3 rounded-lg"
                                disabled={isLoading}
                            >
                                <X size={28} />
                                <span className="ml-2">Cancel</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className="basis-1/4 flex items-center justify-center bg-[var(--biru-dua)] hover:bg-blue-800 cursor-pointer text-white text-2xl font-medium pl-6 pr-12 py-3 rounded-lg"
                                disabled={isLoading}
                            >
                                <ScanSearch size={28} />
                                <span className="ml-2">
                                    {isLoading ? "Process..." : "Analysis"}
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

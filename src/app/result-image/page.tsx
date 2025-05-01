import Image from "next/image";

export default function ResultImage() {
    return (
        <div className="bg-[#F4F4F4] p-10">
            <div className="flex items-center text-5xl font-semibold text-black opacity-60">
                <Image
                    src="/segmentation_result.png"
                    alt="Result Logo"
                    width={70}
                    height={70}
                    className="w-16 h-16 object-cover mt-5 pb-20"
                />
                <span className="ml-4">Result Image</span>
            </div>
            <div className="bg-white rounded-lg shadow-xl mt-10 p-8">
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

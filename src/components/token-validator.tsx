// components/TokenValidator.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenValidator() {
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await fetch("http://localhost:5000/me", {
                    credentials: "include",
                });
                const data = await res.json();

                if (res.status !== 200 || data?.msg === "Token has expired") {
                    // Bersihkan semua jejak login
                    localStorage.clear();
                    sessionStorage.clear();
                    document.cookie = "access_token=; Max-Age=0; path=/;";

                    router.replace("/signin");
                }
            } catch (error) {
                console.error("Gagal validasi token", error);
                router.replace("/signin");
            }
        };

        checkToken();
    }, [router]);

    return null; // Tidak menampilkan apa-apa
}

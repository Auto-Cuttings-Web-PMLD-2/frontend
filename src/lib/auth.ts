"use client";

import Cookies from "js-cookie";

export async function signInUser(data: { email: string; password: string }) {
    const res = await fetch("http://127.0.0.1:5000/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    const result = await res.json();

    // Simpan access_token di cookie biasa (bisa dibaca JS dan middleware)
    Cookies.set("access_token", result.access_token, {
        expires: 1, // 1 hari
        sameSite: "Lax",
        secure: true, // pastikan ini diaktifkan di HTTPS
    });

    return result;
}

export async function signOutUser() {
    // Hapus cookie access_token
    Cookies.remove("access_token");

    // Redirect ke halaman signin
    window.location.href = "/signin";
}

// Tipe data untuk Project
export type Project = {
    id: number;
    name: string;
    postDate: Date;
};

// Data statis
const staticData: Project[] = [
    {
        id: 1001,
        name: "Project 1",
        postDate: new Date("2022-01-01"), // ✅ FIXED
    },
];

// Fungsi untuk mengembalikan data (bisa buat clone agar aman)
export function makeData(count: number): Project[] {
    const result: Project[] = [];

    for (let i = 0; i < count; i++) {
        const item = staticData[i % staticData.length];
        result.push({
            ...item,
            id: item.id + i, // opsional: agar ID-nya unik
        });
    }

    return result;
}

// Tipe data untuk Project
export type Project = {
  id: number;
  name: string;
  sandStoneCount: number;
  sandStoneCoverage: number;
  siltStoneCount: number;
  siltStoneCoverage: number;
  postDate: Date;
};

const staticData: Project[] = [
  {
    id: 1001,
    name: "Project 1",
    sandStoneCount: 15,
    sandStoneCoverage: 0.35,
    siltStoneCount: 10,
    siltStoneCoverage: 0.25,
    postDate: new Date("2022-01-01"), // ✅
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

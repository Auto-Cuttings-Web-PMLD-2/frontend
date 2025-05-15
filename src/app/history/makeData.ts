// Tipe data untuk Person
export type Person = {
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    city: string;
    state: string;
};

// Data statis
const staticData: Person[] = [
    {
        name: {
            firstName: "John",
            lastName: "Doe",
        },
        address: "261 Erdman Ford",
        city: "East Daphne",
        state: "Kentucky",
    },
    {
        name: {
            firstName: "Jane",
            lastName: "Doe",
        },
        address: "769 Dominic Grove",
        city: "Columbus",
        state: "Ohio",
    },
    {
        name: {
            firstName: "Joe",
            lastName: "Doe",
        },
        address: "566 Brakus Inlet",
        city: "South Linda",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Kevin",
            lastName: "Vandy",
        },
        address: "722 Emie Stream",
        city: "Lincoln",
        state: "Nebraska",
    },
    {
        name: {
            firstName: "Joshua",
            lastName: "Rolluffs",
        },
        address: "32188 Larkin Turnpike",
        city: "Omaha",
        state: "Nebraska",
    },
];

// Fungsi untuk mengembalikan data (bisa buat clone agar aman)
export function makeData(count: number): Person[] {
    const result: Person[] = [];

    for (let i = 0; i < count; i++) {
        const item = staticData[i % staticData.length]; // looping data
        result.push({ ...item }); // spread untuk clone
    }

    return result;
}

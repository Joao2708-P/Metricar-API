import { Car } from "@prisma/client";
import prisma from "../../Database/prismaClient";


function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    let currentIndex = shuffled.length;

    // Enquanto ainda houver elementos para embaralhar...
    while (currentIndex !== 0) {
        // Escolhe um elemento aleatório...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // E troca-o com o elemento atual.
        [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    return shuffled;
}

export async function randomCars(): Promise<Car[]> {

    const allCars = await prisma.car.findMany();
    const ramdom = shuffleArray(allCars).slice(0, 4);

    return ramdom;
}
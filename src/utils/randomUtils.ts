export function obtenerElementoAleatorio<T>(array: T[]): T {
    const indiceRandom = Math.floor(Math.random() * array.length);
    return array[indiceRandom];
}
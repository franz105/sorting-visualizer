
export type AnimationStep = [
    'compare' | 'swap' | 'overwrite',
    number,
    number,
];

export type ArrayContextType = {
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    arrayLength: number,
    setArrayLength: React.Dispatch<React.SetStateAction<number>>
}

export type BarContextType = {
    array: number[];
    setArray: React.Dispatch<React.SetStateAction<number[]>>;
    arrayLength: number;
    setArrayLength: React.Dispatch<React.SetStateAction<number>>;
    comparingIndices: [number, number] | null;
    setComparingIndices: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}
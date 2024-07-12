
export type AnimationStep = [
    'compare' | 'swap' | 'overwrite',
    number,
    number
];

export type ArrayContextType = {
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    arrayLength: number,
    setArrayLength: React.Dispatch<React.SetStateAction<number>>
}
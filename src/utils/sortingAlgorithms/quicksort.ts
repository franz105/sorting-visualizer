import { AnimationStep } from "@/lib/types";


export function quicksort(array: number[]) {
    const animations: AnimationStep[] = [];

    quickSortHelper(array, 0, array.length - 1, animations);

    return animations;
}
function quickSortHelper(array: number[], start: number, end: number, animations: AnimationStep[]) {
    if (start >= end || start < 0 || end >= array.length) return;
    let pivot = partition(array, start, end, animations);
    quickSortHelper(array, start, pivot - 1, animations);
    quickSortHelper(array, pivot + 1, end, animations);
}
function partition(array: number[], start: number, end: number, animations: AnimationStep[]) {
    let pivot = array[end];
    let i = start; // pivot index

    for (let j = start; j < end; j++) {
        animations.push(['compare', j, end]);

        if (array[j] <= pivot) {
            animations.push(['swap', i, j]);
            [array[i], array[j]] = [array[j], array[i]];
            i++;
        }
    }
    animations.push(['swap', i, end]);
    [array[i], array[end]] = [array[end], array[i]];
    return i;
}

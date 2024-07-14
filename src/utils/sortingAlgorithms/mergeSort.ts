import { AnimationStep } from "@/lib/types";

export function mergeSort(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    mergeSortHelper(array, 0, array.length - 1, animations);
    return animations;
}
;
function mergeSortHelper(
    array: number[],
    start: number,
    end: number,
    animations: AnimationStep[]
) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(array, start, mid, animations);
    mergeSortHelper(array, mid + 1, end, animations);
    merge(array, start, mid, end, animations);
}
;
// Helper function to merge two halves
function merge(
    array: number[],
    start: number,
    mid: number,
    end: number,
    animations: AnimationStep[]
) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        animations.push(['compare', start + i, mid + 1 + j]);
        if (left[i] <= right[j]) {
            animations.push(['overwrite', start + i + j, k]);
            array[k++] = left[i++];
        } else {
            animations.push(['overwrite', mid + 1 + j, k]);
            array[k++] = right[j++];
        }
    }
    while (i < left.length) {
        animations.push(['compare', start + i, start + i]);
        array[k++] = left[i++];
    }

    while (j < right.length) {
        animations.push(['compare', mid + 1 + j, mid + 1 + j]);
        array[k++] = right[j++];
    }
}
;

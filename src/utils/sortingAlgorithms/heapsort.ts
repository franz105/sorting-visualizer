import { AnimationStep } from "@/lib/types";


export function heapsort(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    heapsortHelper(array, animations);
    return animations;
}
function heapsortHelper(array: number[], animations: AnimationStep[]) {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    for (let i = n - 1; i >= 0; i--) {
        animations.push(['swap', 0, i]);
        [array[0], array[i]] = [array[i], array[0]];
        heapify(array, i, 0, animations);
    }
}
function heapify(array: number[], n: number, i: number, animations: AnimationStep[]) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && array[l] > array[largest]) {
        largest = l;
    }
    if (r < n && array[r] > array[largest]) {
        largest = r;
    }
    if (largest !== i) {
        animations.push(['swap', i, largest]);
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, animations);
    }
}

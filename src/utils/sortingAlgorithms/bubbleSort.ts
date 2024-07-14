import { AnimationStep } from "@/lib/types";


export function bubbleSort(array: number[]) {
    const animations: AnimationStep[] = [];

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            animations.push(['compare', j, j + 1]);
            if (array[j] > array[j + 1]) {
                animations.push(['swap', j, j + 1]);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return animations;
}

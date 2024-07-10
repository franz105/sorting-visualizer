import { AnimationStep } from "@/lib/types"

export function selectionSort(array: number[]) {
    const animations: AnimationStep[] = []
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < array.length; j++) {
            animations.push(['compare', j, minIndex])
            if (array[j] < array[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            let temp = array[i]
            array[i] = array[minIndex]
            array[minIndex] = temp
            animations.push(['swap', i, minIndex])
        }
    }
    return animations
}

export function bubbleSort(array: number[]) {
    const animations: AnimationStep[] = []

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            animations.push(['compare', j, j + 1])
            if (array[j] > array[j + 1]) {
                animations.push(['swap', j, j + 1])
                let temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
        }
    }

    return animations
}

export function mergeSort(array: number[]) {
    const animations: AnimationStep[] = []
    

    return animations
}
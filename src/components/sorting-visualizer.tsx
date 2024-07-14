"use client";

import React, { useEffect, useRef, useState } from 'react';
import { generateRandomArray } from '@/utils/utils';
import { AnimationStep } from "@/lib/types";
import { quicksort } from "@/utils/sortingAlgorithms/quicksort";
import { mergeSort } from "@/utils/sortingAlgorithms/mergeSort";
import { selectionSort } from "@/utils/sortingAlgorithms/selectionSort";
import { bubbleSort } from "@/utils/sortingAlgorithms/bubbleSort";
import { useBarContext, BarProvider } from "@/contexts/BarContext";
import Bars from "./bars";
import { heapsort } from "@/utils/sortingAlgorithms/heapsort";
import SortingButton from "./sorting-button";

const executeAnimations = async (
    animations: AnimationStep[],
    delay: number,
    stopFlag: React.MutableRefObject<boolean>,
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    setComparingIndices: React.Dispatch<React.SetStateAction<[number, number] | null>>
): Promise<void> => {
    for (let i = 0; i < animations.length; i++) {
        if (stopFlag.current) break;
    
        const [action, index1, index2OrValue] = animations[i];
    
        if (action === 'compare') {
            setComparingIndices([index1, index2OrValue]);
        } else {
            setComparingIndices(null);
        }
        
        await new Promise<void>(resolve => setTimeout(resolve, delay));
    
        if (stopFlag.current) break;
       
    
        setArray(prevArray => {
            const newArray = [...prevArray];
            if (action === 'swap') {
                [newArray[index1], newArray[index2OrValue]] = [newArray[index2OrValue], newArray[index1]];
            } else if (action === 'overwrite') {
                const fromIndex = index1;
                const toIndex = index2OrValue;        
                if (fromIndex !== toIndex) {
                    const [element] = newArray.splice(fromIndex, 1);
                    // Insert the element at the target position
                    newArray.splice(toIndex, 0, element);
                }
            }
            return newArray;
        });
    

        setComparingIndices(null);
        
    }
};

export default function SortingVisualizer() {
    const { array, setArray, arrayLength, setArrayLength, comparingIndices, setComparingIndices } = useBarContext();
    const DEFAULT_LENGTH = 20;
    const [minValue, setMinValue] = useState<number>(1); 
    const [inputArrayLength, setInputArrayLength] = useState<number>(DEFAULT_LENGTH);
    const [isSorting, setIsSorting] = useState<boolean>(false);


    const stopFlag = useRef<boolean>(false);

    useEffect(() => {
        setMinValue(Math.ceil(0.05 * arrayLength));
        const initialArray = generateRandomArray(DEFAULT_LENGTH, minValue, DEFAULT_LENGTH);
        setArray(initialArray);
        setArrayLength(DEFAULT_LENGTH);
    }, [setArray, setArrayLength]);

    const startSorting = async (sortingAlgorithm: (array: number[]) => AnimationStep[]) => {
        if (isSorting) {
            stopFlag.current = true;  
            await new Promise(resolve => setTimeout(resolve, 100));
            setComparingIndices(null); 
        }
        stopFlag.current = false;
        setIsSorting(true);

        const animations = sortingAlgorithm([...array]);
        await executeAnimations(animations, 10, stopFlag, setArray, setComparingIndices);
        setIsSorting(false);
    };

    const startSelectionSort = () => startSorting(selectionSort);
    const startBubbleSort = () => startSorting(bubbleSort);
    const startMergeSort = () => startSorting(mergeSort);
    const startQuickSort = () => startSorting(quicksort);
    const startHeapSort = () => startSorting(heapsort);

    const resetArray = () => {
        if (isSorting) {
            stopFlag.current = true;
        }
        setMinValue(Math.ceil(0.05 * arrayLength));
        const newArray = generateRandomArray(inputArrayLength, minValue, inputArrayLength);
        console.log(newArray);
        setComparingIndices(null);
        setArray(newArray);
        setArrayLength(inputArrayLength);
        setIsSorting(false);
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setInputArrayLength(value);
    };


    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>
            <div className="p-5"></div>
            <Bars />
            <div className="p-5"></div>
            <div className="flex space-x-1 items-center">
                <SortingButton name="Selection Sort" onClick={startSelectionSort}/>
                <SortingButton name="Bubble Sort" onClick={startBubbleSort}/>
                <SortingButton name="Merge Sort" onClick={startMergeSort}/>
                <SortingButton name="Quicksort" onClick={startQuickSort}/>
                <SortingButton name="Heap Sort" onClick={startHeapSort}/>
            </div>
            <div className="p-5"></div>
            <div className="flex space-x-4 items-center">
                <label className="flex items-center">
                    Length:
                    <input
                        type="range"
                        min="10"
                        max="500"
                        value={inputArrayLength}
                        onChange={handleSliderChange}
                        className="ml-2"
                    />
                    <div className="w-8">
                        <span className="ml-2 text-center">{inputArrayLength}</span>
                    </div>
                    
                </label>
                <button
                    onClick={resetArray}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Generate New Array
                </button>
            </div>
        </div>
    );
}

"use client";

import React, { useEffect, useRef, useState } from 'react';
import { randomIntFromInterval } from '@/utils/utils';
import { bubbleSort, selectionSort } from '@/utils/sorting-algorithms';
import { useArrayContext, ArrayProvider } from "@/contexts/ArrayContext";
import { AnimationStep } from "@/lib/types";
import Bars from "./bars";

const generateRandomArray = (length: number, min: number, max: number) => {
    return Array.from({ length }, () => randomIntFromInterval(min, max));
}

const executeAnimations = async (
    animations: AnimationStep[],
    delay: number,
    stopFlag: React.MutableRefObject<boolean>,
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    setComparingIndices: React.Dispatch<React.SetStateAction<[number, number] | null>>
): Promise<void> => {
    for (let i = 0; i < animations.length; i++) {
        if (stopFlag.current) break;

        const [action, index1, index2] = animations[i];

        if (action === 'compare') {
            setComparingIndices([index1, index2]);    
        } 
        
        await new Promise<void>(resolve => setTimeout(resolve, delay));

        if (stopFlag.current) break;
       

        setArray(prevArray => {
            const newArray = [...prevArray];
            if (action === 'swap') {
                [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
            }
            return newArray;
        });

        setComparingIndices(null);
    }
};

export default function SortingVisualizer() {
    const { array, setArray, arrayLength, setArrayLength } = useArrayContext();
    const DEFAULT_LENGTH = 20;
    const FIXED_MIN = 5;
    const [inputArrayLength, setInputArrayLength] = useState<number>(DEFAULT_LENGTH);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [comparingIndices, setComparingIndices] = useState<[number, number] | null>(null);


    const stopFlag = useRef<boolean>(false);

    useEffect(() => {
        const initialArray = generateRandomArray(DEFAULT_LENGTH, FIXED_MIN, DEFAULT_LENGTH);
        setArray(initialArray);
        setArrayLength(DEFAULT_LENGTH);
    }, [setArray, setArrayLength]);

    const startSorting = async (sortingAlgorithm: (array: number[]) => AnimationStep[]) => {
        if (isSorting) {
            stopFlag.current = true;
            console.log("Sorting stopped");
            setArray([...array]);
        }
        stopFlag.current = false;
        setIsSorting(true);

        const animations = sortingAlgorithm([...array]);
        await executeAnimations(animations, 5, stopFlag, setArray, setComparingIndices);
        setIsSorting(false);
    };

    const startSelectionSort = () => startSorting(selectionSort);
    const startBubbleSort = () => startSorting(bubbleSort);

    const resetArray = () => {
        if (isSorting) {
            stopFlag.current = true;
        }
        const newArray = generateRandomArray(inputArrayLength, FIXED_MIN, inputArrayLength);
        setArray(newArray);
        setArrayLength(inputArrayLength);
        setIsSorting(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            resetArray();
        }
    };

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setInputArrayLength(Math.max(10, Math.min(value, 500)));
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>
            <div className="p-5"></div>
            <Bars comparingIndices={comparingIndices} />
            <div className="p-5"></div>
            <div className="flex space-x-1 items-center">
                <button
                    onClick={startSelectionSort}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Selection Sort
                </button>
                <button
                    onClick={startBubbleSort}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Bubble Sort
                </button>
            </div>
            <div className="p-5"></div>
            <div className="flex space-x-4 items-center">
                <label className="flex items-center">
                    Length:
                    <input
                        type="number"
                        value={inputArrayLength}
                        onChange={handleLengthChange}
                        onKeyDown={handleKeyDown}
                        min="10"
                        max="500"
                        className="ml-2 p-1 border rounded text-black"
                    />
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

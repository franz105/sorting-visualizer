"use client"

import React, { useEffect, useRef, useState } from 'react'
import { randomIntFromInterval } from '@/utils/utils'
import { AnimationStep } from "@/lib/types"
import { bubbleSort, selectionSort } from '@/utils/sorting-algorithms'

const generateRandomArray = (length: number, min: number, max: number) => {
    return Array.from({ length }, () => randomIntFromInterval(min, max))
}

const executeAnimations = (
    animations: AnimationStep[],
    delay: number,
    stopFlag: React.MutableRefObject<boolean>,
    timeouts: React.MutableRefObject<NodeJS.Timeout[]>
) => {
    const bars = document.getElementsByClassName('bar') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < animations.length; i++) {
        if (stopFlag.current) break;

        const timeout = setTimeout(() => {
            if (stopFlag.current) return

            const [action, index1, index2] = animations[i]
            const barOne = bars[index1]
            const barTwo = bars[index2]
            if (action === 'compare') {
                barOne.classList.add('bg-red-500')
                barTwo.classList.add('bg-red-500')
                setTimeout(() => {
                    barOne.classList.remove('bg-red-500')
                    barTwo.classList.remove('bg-red-500')
                }, delay);
            } else if (action === 'swap') {
                const heightOne = barOne.style.height
                const heightTwo = barTwo.style.height
                barOne.style.height = heightTwo
                barTwo.style.height = heightOne
            }
        }, i * delay);
        timeouts.current.push(timeout)
    }
};

  

export default function SortingVisualizer() {
    // Default values
    const DEFAULT_LENGTH = 50
    const FIXED_MIN = 5

    // State hooks
    const [arrayLength, setArrayLength] = useState<number>(DEFAULT_LENGTH)
    const [inputArrayLength, setInputArrayLength] = useState<number>(DEFAULT_LENGTH)
    const [array, setArray] = useState<number[]>(generateRandomArray(DEFAULT_LENGTH, FIXED_MIN, DEFAULT_LENGTH))
    const [originalArray, setOriginalArray] = useState<number[]>(array)
    const [isSorting, setIsSorting] = useState<boolean>(false)
    const [containerWidth, setContainerWidth] = useState<number>(0)
    const [containerHeight, setContainerHeight] = useState<number>(0)
    
    // Refs for stopping animations
    const stopFlag = useRef<boolean>(false)
    const timeouts = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        setContainerWidth(window.innerWidth * (7 / 8))
        setContainerHeight(window.innerHeight * (5 / 8))
    }, []);

    const startSorting = (
        sortingAlogithm: (array: number[]) => AnimationStep[]
    ) => {
        if (isSorting) {
            stopFlag.current = true;
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        }
        setArray([...originalArray])
        stopFlag.current = false
        setIsSorting(true)
        const animations = sortingAlogithm([...originalArray])
        executeAnimations(animations, 5, stopFlag, timeouts)
    }

    const startSelectionSort = () => startSorting(selectionSort);
    const startBubbleSort = () => startSorting(bubbleSort);

    // Reset function to generate a new array and update dimensions
    const resetArray = () => {
        if (isSorting) {
            stopFlag.current = true;
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        }
        const newArray = generateRandomArray(inputArrayLength, FIXED_MIN, inputArrayLength)
        setArray(newArray)
        setOriginalArray(newArray)
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
        if (value >= 10 && value <= 500) {
            setInputArrayLength(value);
        } else if (value < 10) {
            setInputArrayLength(10);
        }  else if (value > 500) {
            setInputArrayLength(500);
        }
    };




    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>
            <div className="p-5"></div>
            <div
                className="flex justify-center items-end mb-4"
                style={{ height: `${containerHeight}px`, width: `${containerWidth}px` }}
            >
                {
                array.map((value, index) => {
                    const barWidth = (containerWidth / arrayLength) * 0.7; // 80% of available space
                    const barMargin = (containerWidth / arrayLength) * 0.2; // 10% of available space

                    return (
                        <div
                            key={index}
                            className="bg-blue-500 bar"
                            style={{
                                width: `${barWidth}px`,
                                height: `${(value / arrayLength) * containerHeight}px`,
                                marginLeft: `${barMargin}px`,
                            }}
                        ></div>
                    );
                })}
            </div>
                <div className="p-5"></div>
                <div className="flex space-x-1 items-center">
                    <button
                        onClick={startSelectionSort}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    > Selection Sort</button>
                    <button
                        onClick={startBubbleSort}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    > Bubble Sort</button>
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
                > Generate New Array</button>
            </div>
        </div>
    );
};

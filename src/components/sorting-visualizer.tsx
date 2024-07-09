"use client"

import React, { useEffect, useState } from 'react'
import { randomIntFromInterval } from '@/utils/utils'

const generateRandomArray = (length: number, min: number, max: number) => {
    return Array.from({ length }, () => randomIntFromInterval(min, max))
}

export default function SortingVisualizer() { 
    // Default values
    const DEFAULT_LENGTH = 10;
    const FIXED_MIN = 5;
    const FIXED_MAX = 100;

    // State hooks
    const [arrayLength, setArrayLength] = useState<number>(DEFAULT_LENGTH);
    const [inputArrayLength, setInputArrayLength] = useState<number>(DEFAULT_LENGTH);
    const [array, setArray] = useState<number[]>(generateRandomArray(DEFAULT_LENGTH, FIXED_MIN, FIXED_MAX));
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    // Set container dimensions based on screen size
    useEffect(() => {
        setContainerWidth(window.innerWidth * (7 / 8));
        setContainerHeight(window.innerHeight * (5 / 8));
    }, []);

    // Reset function to generate a new array and update dimensions
    const resetArray = () => {
        setArray(generateRandomArray(inputArrayLength, FIXED_MIN, FIXED_MAX));
        setArrayLength(inputArrayLength);
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

    const maxValueInArray = Math.max(...array);

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>
            <div className="p-5"></div>
            <div
                className="flex justify-center items-end mb-4"
                style={{ height: `${containerHeight}px`, width: `${containerWidth}px` }}
            >
                {array.map((value, index) => {
                    const barWidth = (containerWidth / arrayLength) * 0.8; // 80% of available space
                    const barMargin = (containerWidth / arrayLength) * 0.1; // 10% of available space

                    return (
                        <div
                            key={index}
                            className="bg-blue-500"
                            style={{
                                width: `${barWidth}px`,
                                height: `${(value / maxValueInArray) * containerHeight}px`,
                                marginLeft: `${barMargin / 2}px`,
                                marginRight: `${barMargin / 2}px`,
                            }}
                        ></div>
                    );
                })}
            </div>
            <div className="p-10"></div>
            <div className="flex space-x-4 mb-4 items-center">
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
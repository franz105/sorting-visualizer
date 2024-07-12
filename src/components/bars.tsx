"use client";

import { useBarContext } from "@/contexts/BarContext";
import React, { useEffect, useState } from 'react';

export default function Bars() {
    const { array, arrayLength, comparingIndices } = useBarContext();
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
        setContainerWidth(window.innerWidth * (7 / 8));
        setContainerHeight(window.innerHeight * (5 / 8));
    }, [array]);

    return (
        <div className="flex justify-center items-end mb-4"
            style={{ height: `${containerHeight}px`, width: `${containerWidth}px` }}>
            {array.map((value, index) => {
                const barWidth = (containerWidth / arrayLength) * 0.7; // 70% of available space
                const barMargin = (containerWidth / arrayLength) * 0.2; // 20% of available space
                const isComparing = comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1]);

                return (
                    <div
                        key={index}
                        className={`bar ${isComparing ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{
                            width: `${barWidth}px`,
                            height: `${(value / arrayLength) * containerHeight}px`,
                            marginLeft: `${barMargin}px`,
                        }}
                    >
                        {value}
                    </div>
                );
            })}
        </div>
    );
}

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
                let barWidth = containerWidth / arrayLength;
                let barMargin = 0;
                if (barWidth > 4) {
                    barWidth = (containerWidth / arrayLength) * 0.7; 
                    barMargin = (containerWidth / arrayLength) * 0.2 ; 
                } 
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
                    </div>
                );
            })}
        </div>
    );
}

// contexts/BarContext.tsx
import { BarContextType } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

const BarContext = createContext<BarContextType | undefined>(undefined);

export const useBarContext = () => {
    const context = useContext(BarContext);
    if (!context) {
        throw new Error("useBarContext must be used within a BarProvider");
    }
    return context;
};

export const BarProvider = ({ children }: { children: ReactNode }) => {
    const [array, setArray] = useState<number[]>([]);
    const [arrayLength, setArrayLength] = useState<number>(0);
    const [comparingIndices, setComparingIndices] = useState<[number, number] | null>(null);

    return (
        <BarContext.Provider value={{ array, setArray, arrayLength, setArrayLength, comparingIndices, setComparingIndices }}>
            {children}
        </BarContext.Provider>
    );
};

// contexts/ArrayContext.tsx
import { ArrayContextType } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

export const ArrayContext = createContext<ArrayContextType | undefined>(undefined);

export const ArrayProvider = ({ children }: { children: ReactNode }) => {
    const [array, setArray] = useState<number[]>([]);
    const [arrayLength, setArrayLength] = useState<number>(20);

    return (
        <ArrayContext.Provider value={{ array, setArray, arrayLength, setArrayLength }}>
            {children}
        </ArrayContext.Provider>
    );
};

export function useArrayContext() {
    const context = useContext(ArrayContext);
    if (!context) {
        throw new Error('useArrayContext must be used within an ArrayProvider');
    }
    return context;
}

"use client";
import SortingVisualizer from "@/components/sorting-visualizer";
import { ArrayProvider } from "@/contexts/ArrayContext";

export default function Home() {
  return (
    <main className="">
      <ArrayProvider>
        <SortingVisualizer />
      </ArrayProvider>
    </main>
  );
}



"use client";
import SortingVisualizer from "@/components/sorting-visualizer";
import { BarProvider } from "@/contexts/BarContext";

export default function Home() {
  return (
    <main className="">
      <BarProvider>
          <SortingVisualizer />
      </BarProvider>
    </main>
  );
}



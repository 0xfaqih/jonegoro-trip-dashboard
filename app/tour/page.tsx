import { AddTour } from "@/containers/tour-page/addTour-section";
import TourList from "@/containers/tour-page/listTour-section";
import { FC } from "react";
import { TourProvider } from "@/contexts/tourContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface TourProps {}

const Tour: FC<TourProps> = () => {
  return (
    <ProtectedRoute>
      <TourProvider>
      <main className="flex flex-col p-6">
        <h1 className="mb-4 text-2xl font-bold">Input Data Wisata</h1>
        <div className="flex flex-row-reverse">
          <TourList />
          <AddTour />
        </div>
      </main>
    </TourProvider>
    </ProtectedRoute>
  );
};

export default Tour;

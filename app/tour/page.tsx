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
        <div className="flex flex-row-reverse gap-4">
          <TourList />
          <AddTour />
        </div>
      </main>
    </TourProvider>
    </ProtectedRoute>
  );
};

export default Tour;

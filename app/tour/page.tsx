import { AddTour } from "@/containers/tour-page/addTour-section";
import TourList from "@/containers/tour-page/listTour-section";
import { FC } from "react";

interface TourProps {}

const Tour: FC<TourProps> = () => {
  return (
    <main className="flex flex-col">
      <h1 className="mb-4 text-2xl font-bold">Input Data Wisata</h1>
      <div className="flex flex-row-reverse">
         <TourList/>
         <AddTour/>
      </div>
    </main>
  );
};

export default Tour;

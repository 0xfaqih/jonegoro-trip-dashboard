import { ProfileForm } from "@/containers/tour-page/addTour-section";
import TourList from "@/containers/tour-page/listTour-section";
import { FC } from "react";

interface TourProps {}

const Tour: FC<TourProps> = () => {
  return (
    <main className="flex flex-col">
      <h1 className="mb-1">Data Wisata</h1>
      <div className="flex flex-row-reverse">
         <TourList/>
         <ProfileForm/>
      </div>
    </main>
  );
};

export default Tour;

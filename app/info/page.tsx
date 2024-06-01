import { AddInfo } from "@/containers/info-page/addInfo-section";
import { FC } from "react";

interface TourProps {}

const Tour: FC<TourProps> = () => {
  return (
      <main className="flex flex-col">
        <h1 className="mb-4 text-2xl font-bold">Buat Informasi</h1>
        <div className="grid grid-cols-2 gap-4">
            <AddInfo/>
        </div>
      </main>
  );
};

export default Tour;

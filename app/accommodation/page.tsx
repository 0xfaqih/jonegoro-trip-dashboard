import { AddAccommodation } from "@/containers/accommodation-page/addAccommodation-section";
import { AccommodationList } from "@/containers/accommodation-page/listAccommodation-section";
import { AccommodationProvider } from "@/contexts/accommodationContext";
import { FC } from "react";
interface AccommodationProps { }

const Accommodation: FC<AccommodationProps> = () => {
  return (
      <AccommodationProvider>
        <main className="flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <AddAccommodation/>
          <AccommodationList/>
        </div>
        </main>
      </AccommodationProvider>
  );
};

export default Accommodation;

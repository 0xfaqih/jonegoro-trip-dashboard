import TourEditForm from "@/containers/tour-page/editTour-section";
import { FC } from "react";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  return (
    <main className="flex flex-col">
      <h1 className="mb-4 text-2xl font-bold">Edit Data Wisata</h1>
      <div className="max-w-[1000px]">
        <TourEditForm />
      </div>
    </main>
  );
};

export default Edit;

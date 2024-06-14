import TourEditForm from "@/containers/tour-page/editTour-section";
import { FC } from "react";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  return (
    <main className="flex flex-col">
      <div className="p-6">
        <TourEditForm />
      </div>
    </main>
  );
};

export default Edit;

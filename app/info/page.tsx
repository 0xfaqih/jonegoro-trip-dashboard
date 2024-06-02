import { AddInfo } from "@/containers/info-page/addInfo-section";
import InfoList from "@/containers/info-page/listInfo-section";
import { FC } from "react";
import { EditInfoProvider } from "@/contexts/editInfoContext";
interface InfoProps { }

const Info: FC<InfoProps> = () => {
  return (
    <EditInfoProvider>
      <main className="flex flex-col">
        <h1 className="mb-4 text-2xl font-bold">Buat Informasi</h1>
        <div className="grid grid-cols-2 gap-4">
          <AddInfo />
        </div>
        <div className="flex flex-col">
          <h1 className="m-auto text-xl font-bold my-4">Daftar Informasi</h1>
          <InfoList />
        </div>
      </main>
    </EditInfoProvider>
  );
};

export default Info;

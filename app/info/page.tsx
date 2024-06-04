import { AddInfo } from "@/containers/info-page/addInfo-section";
import InfoList from "@/containers/info-page/listInfo-section";
import { FC } from "react";
import { InfoProvider } from "@/contexts/infoContext";
interface InfoProps { }

const Info: FC<InfoProps> = () => {
  return (
    <InfoProvider>
      <main className="flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <AddInfo />
        </div>
        <div className="flex flex-col">
          <h1 className="m-auto text-xl font-bold my-4 mt-10">Daftar Informasi</h1>
          <InfoList />
        </div>
      </main>
    </InfoProvider>
  );
};

export default Info;

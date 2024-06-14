import { AddInfo } from "@/containers/info-page/addInfo-section";
import InfoList from "@/containers/info-page/listInfo-section";
import { FC } from "react";
import { InfoProvider } from "@/contexts/infoContext";
interface InfoProps { }

const Info: FC<InfoProps> = () => {
  return (
    <InfoProvider>
      <main className="flex flex-col p-6">
        <div className="grid gap-4">
          <AddInfo />
        </div>
        <div className="flex flex-col w-full mt-6">
          <InfoList />
        </div>
      </main>
    </InfoProvider>
  );
};

export default Info;

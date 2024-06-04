import { AddSouvenir } from "@/containers/souvenir-page/addSouvenir-section";
import { SouvenirList } from "@/containers/souvenir-page/listSouvenir-section";
import { SouvenirProvider } from "@/contexts/souvenirContext";
import { FC } from "react";
interface InfoProps { }

const Info: FC<InfoProps> = () => {
  return (
    <SouvenirProvider>
      <main className="flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <AddSouvenir />
          <SouvenirList />
        </div>
      </main>
    </SouvenirProvider>
  );
};

export default Info;

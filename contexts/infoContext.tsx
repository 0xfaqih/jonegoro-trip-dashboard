"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InfoContextProps {
   editData: any | null;
   setEditData: (data: any | null) => void;
   infos: any[];
   setInfos: (infos: any[]) => void;
   addInfo: (info: any) => void;
}

const InfoContext = createContext<InfoContextProps | undefined>(undefined);

export const InfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [editData, setEditData] = useState<any | null>(null);
   const [infos, setInfos] = useState<any[]>([]);

   const addInfo = (info: any) => {
      setInfos((prevInfos) => [{ id: info.id, title: info.title }, ...prevInfos]);
    };
    

   return (
      <InfoContext.Provider value={{ editData, setEditData, infos, setInfos, addInfo }}>
         {children}
      </InfoContext.Provider>
   );
};

export const useEditInfo = (): InfoContextProps => {
   const context = useContext(InfoContext);
   if (!context) {
      throw new Error('useEditInfo must be used within an EditInfoProvider');
   }
   return context;
};

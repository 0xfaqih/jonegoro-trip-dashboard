"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SouvenirContextProps {
   editData: any | null;
   setEditData: (data: any | null) => void;
   souvenirs: any[];
   setSouvenirs: (souvenirs: any[]) => void;
   addSouvenir: (souvenir: any) => void;
   updateSouvenir: (updatedSouvenir: any) => void;
}

const SouvenirContext = createContext<SouvenirContextProps | undefined>(undefined);

export const SouvenirProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [editData, setEditData] = useState<any | null>(null);
   const [souvenirs, setSouvenirs] = useState<any[]>([]);

   const addSouvenir = (souvenir: any) => {
      setSouvenirs((prevSouvenirs) => [{ id: souvenir.id, name: souvenir.name, location: souvenir.location }, ...prevSouvenirs]);
    };
   
   const updateSouvenir = (updatedSouvenir: any) => {
      if (!updatedSouvenir || !updatedSouvenir.id) {
         console.error("Invalid updated souvenir object:", updatedSouvenir);
         return;
      }
      
      setSouvenirs((prevSouvenirs) =>
         prevSouvenirs.map((souvenir) =>
            souvenir.id === updatedSouvenir.id ? { ...souvenir, ...updatedSouvenir } : souvenir
         )
      );
   };

   return (
      <SouvenirContext.Provider value={{ editData, setEditData, souvenirs, setSouvenirs, addSouvenir, updateSouvenir }}>
         {children}
      </SouvenirContext.Provider>
   );
};

export const useSouvenir = (): SouvenirContextProps => {
   const context = useContext(SouvenirContext);
   if (!context) {
      throw new Error('useSouvenir must be used within a SouvenirProvider');
   }
   return context;
};

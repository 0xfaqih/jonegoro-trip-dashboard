"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Info } from '@/types/Info';

interface EditInfoContextProps {
   editData: Info | null;
   setEditData: (data: Info | null) => void;
}

const EditInfoContext = createContext<EditInfoContextProps | undefined>(undefined);

export const EditInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [editData, setEditData] = useState<Info | null>(null);

   return (
      <EditInfoContext.Provider value={{ editData, setEditData }}>
         {children}
      </EditInfoContext.Provider>
   );
};

export const useEditInfo = (): EditInfoContextProps => {
   const context = useContext(EditInfoContext);
   if (!context) {
      throw new Error('useEditInfo must be used within an EditInfoProvider');
   }
   return context;
};

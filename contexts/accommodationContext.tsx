"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccommodationContextProps {
   editData: any | null;
   setEditData: (data: any | null) => void;
   accommodations: any[];
   setAccommodations: (accommodations: any[]) => void;
   addAccommodation: (accommodation: any) => void;
   updateAccommodation: (updateAccommodation: any) => void;
}

const AccommodationContext = createContext<AccommodationContextProps | undefined>(undefined);

export const AccommodationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [editData, setEditData] = useState<any | null>(null);
   const [accommodations, setAccommodations] = useState<any[]>([]);

   const addAccommodation = (accommodation: any) => {
      setAccommodations((prevAccommodations) => [{ id: accommodation.id, name: accommodation.name, telephon: accommodation.telephon, image: accommodation.image, location: accommodation.location, category: accommodation.category }, ...prevAccommodations]);
    };
   
   const updateAccommodation = (updatedAccommodation: any) => {
      if (!updatedAccommodation || !updatedAccommodation.id) {
         console.error("Invalid updated accomoodation object:", updatedAccommodation);
         return;
      }
      
      setAccommodations((prevAccommodations) =>
         prevAccommodations.map((accommodation) =>
            accommodation.id === updatedAccommodation.id ? { ...accommodation, ...updatedAccommodation } : accommodation
         )
      );
   };

   return (
      <AccommodationContext.Provider value={{ editData, setEditData, accommodations, setAccommodations, addAccommodation, updateAccommodation }}>
         {children}
      </AccommodationContext.Provider>
   );
};

export const useAccommodation = (): AccommodationContextProps => {
   const context = useContext(AccommodationContext);
   if (!context) {
      throw new Error('useAccommodation must be used within a AccommodationProvider');
   }
   return context;
};

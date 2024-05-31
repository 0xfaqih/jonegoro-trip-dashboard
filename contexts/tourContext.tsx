"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface Tour {
  id: number;
  tour_name: string;
  place: string;
  category: string;
}

interface TourContextType {
  tours: Tour[];
  addTour: (tour: Tour) => void;
  setTours: (tours: Tour[]) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider = ({ children }: { children: ReactNode }) => {
  const [tours, setTours] = useState<Tour[]>([]);

  const addTour = (tour: Tour) => {
   setTours((prevTours) => [tour, ...prevTours]); 
 };

  return (
    <TourContext.Provider value={{ tours, addTour, setTours }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

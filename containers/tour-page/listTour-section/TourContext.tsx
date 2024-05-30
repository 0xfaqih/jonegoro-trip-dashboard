"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tour } from './types';

interface TourContextType {
  tours: Tour[];
  addTour: (tour: Tour) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

export const TourProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [tours, setTours] = useState<Tour[]>([]);

  const addTour = (tour: Tour) => {
    setTours(prevTours => [...prevTours, tour]);
  };

  return (
    <TourContext.Provider value={{ tours, addTour }}>
      {children}
    </TourContext.Provider>
  );
};
"use client";

import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { deleteAccommodation, getAccommodationById, getAccommodations } from '@/utils/api';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';
import { useAccommodation } from '@/contexts/accommodationContext';

export const AccommodationList: React.FC = () => {
  const { accommodations, setAccommodations, setEditData } = useAccommodation();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccommodations();
        setAccommodations(data);
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch data. Please try again later.",
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast, setAccommodations]);

  const handleDelete = async (id: number) => {
    try {
      await deleteAccommodation(id);
      setAccommodations(accommodations.filter((item) => item.id !== id));
      toast({
        variant: "success",
        title: "Success",
        description: "Akomodasi berhasil dihapus"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete data. Please try again later.",
      });
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const data = await getAccommodationById(id);
      setEditData(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data. Please try again later.",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-10">Daftar Akomodasi</h1>
      <DataTable columns={columns(handleEdit, handleDelete)} data={accommodations} isLoading={isLoading} />
    </div>
  );
};

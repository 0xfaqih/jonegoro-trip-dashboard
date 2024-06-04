"use client"

import React, { useEffect, useState } from 'react';
import { useSouvenir } from '@/contexts/souvenirContext';
import { useToast } from '@/components/ui/use-toast';
import { deleteSouvenir, getSouvenirs, getSouvenirsById } from '@/utils/api';
import { DataTable } from './data-table';
import { columns } from './column';

export const SouvenirList: React.FC = () => {
   const { souvenirs, setSouvenirs, setEditData } = useSouvenir();
   const [isLoading, setIsLoading] = useState(true);
   const { toast } = useToast();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await getSouvenirs();
            setSouvenirs(data);
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
   }, [toast, setSouvenirs]);

   const handleDelete = async (id: number) => {
      try {
         await deleteSouvenir(id);
         setSouvenirs(souvenirs.filter((item) => item.id !== id));
         toast({
            variant: "success",
            title: "Success",
            description: "Oleh oleh berhasil dihapus"
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
         const data = await getSouvenirsById(id);
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
      <div className="container mx-auto w-full flex-1">
         <h1 className='mb-10 text-2xl font-semibold'>Daftar Oleh Oleh</h1>
         <DataTable columns={columns(handleEdit, handleDelete)} data={souvenirs} isLoading={isLoading} />
      </div>
   );
};

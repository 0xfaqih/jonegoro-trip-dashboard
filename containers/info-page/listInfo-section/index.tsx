"use client"

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
import { Info } from '@/types/Info';
import { useState, useEffect } from 'react';
import { getInfos, deleteInfo, getInfoById } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';
import { useEditInfo } from '@/contexts/editInfoContext';

const InfoList: React.FC = () => {
   const [info, setInfo] = useState<Info[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const { toast } = useToast();
   const { setEditData } = useEditInfo();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await getInfos();
            setInfo(data);
         } catch (error) {
            toast({
               variant: "destructive",
               title: "Error",
               description: "Failed to fetch data. Please try again later.",
            });
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [toast]);

   const handleDelete = async (id: number) => {
      try {
         await deleteInfo(id);
         setInfo(info.filter((item) => item.id !== id));
         toast({
            variant: "success",
            title: "Success",
            description: "Info berhasil dihapus"
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
         const data = await getInfoById(id);
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
         <DataTable columns={columns(handleEdit, handleDelete)} data={info} isLoading={isLoading} />
      </div>
   );
};

export default InfoList;

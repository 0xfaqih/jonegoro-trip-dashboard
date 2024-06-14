"use client"

import React, { useEffect } from 'react';
import { useEditInfo } from '@/contexts/infoContext';
import { useToast } from '@/components/ui/use-toast';
import { getInfos, deleteInfo, getInfoById } from '@/utils/api';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';

const InfoList: React.FC = () => {
  const { infos, setInfos, setEditData } = useEditInfo();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfos();
        setInfos(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch data. Please try again later.",
        });
      }
    };

    fetchData();
  }, [toast, setInfos]);

  const handleDelete = async (id: number) => {
    try {
      await deleteInfo(id);
      setInfos(infos.filter((item) => item.id !== id));
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
      <DataTable columns={columns(handleEdit, handleDelete)} data={infos}/>
    </div>
  );
};

export default InfoList;
